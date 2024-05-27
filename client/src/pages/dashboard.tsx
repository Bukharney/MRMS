import { useStore } from "@/models/RootStore";
import { observer } from "mobx-react-lite";
import { MoviesTable } from "@/components/moviesTable";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SearchBar from "@/components/searchBar";

export const Dashboard = observer(() => {
  const nevigate = useNavigate();
  const rootStore = useStore();
  rootStore.calculateTotalPages(rootStore.table.limit);

  useEffect(() => {
    const getMovies = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const payload: { role: string; username: string; exp: number } =
        jwtDecode(token);
      rootStore.user.updateRole(payload.role);
      rootStore.user.updateUsername(payload.username);
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        nevigate("/login");
        return;
      }
      const res = await fetch("/api/movies/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await res.json().then((data) => {
          rootStore.getMovies(data);
        });
      }
    };

    getMovies();
  }, [nevigate, rootStore]);

  return (
    <>
      <div className="container h-full w-screen">
        <div className="flex justify-between p-4 mx-auto">
          <div className="pt-4">
            <h1 className="text-2xl font-bold ">Dashboard</h1>
            <p className="text-sm text-gray-500 ">
              Manage your movie records in one-click.
            </p>
          </div>
          <div className="flex flex-col justify-between items-end pt-2">
            <div className="flex justify-end py-2">
              <Button
                variant={"secondary"}
                onClick={() => {
                  localStorage.removeItem("token");
                  nevigate("/login");
                }}
              >
                Logout
              </Button>
            </div>
            <div>
              <div className="flex flex-col justify-end">
                <p className=" text-sm text-gray-500 text-end">
                  Welcome, {rootStore.user.username}
                </p>
                <p className=" text-sm text-gray-500 text-end">
                  with role: {rootStore.user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
        {rootStore.movies.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <h1 className="text-2xl">No records found.</h1>
          </div>
        ) : (
          <Card className="w-full mb-4">
            <SearchBar />
            <MoviesTable />
          </Card>
        )}
      </div>
      <Toaster />
    </>
  );
});

export default Dashboard;
