import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/models/RootStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

export const Login = observer(() => {
  const rootStore = useStore();
  const nevigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>MRMS</CardTitle>
          <CardDescription>
            Manage your movie records in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  type="username"
                  onChange={(e) => {
                    rootStore.user.updateUsername(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  onChange={(e) => {
                    rootStore.user.updatePassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={async () => {
              const res = await rootStore.user.login(
                rootStore.user.username,
                rootStore.user.password
              );
              if (res) {
                rootStore.user.updatePassword("");
                nevigate("/");
              }
            }}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
});

export default Login;
