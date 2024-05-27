import { t } from "mobx-state-tree";
import api from "@/lib/api/user";

export const UserModel = t
  .model("UserModel", {
    id: t.identifier,
    username: t.string,
    email: t.string,
    role: t.enumeration(["admin", "manager", "teamleader", "floorstaff"]),
    password: t.string,
  })
  .actions((self) => ({
    updateUsername(username: string) {
      self.username = username;
    },
    updateEmail(email: string) {
      self.email = email;
    },
    updateRole(role: string) {
      self.role = role;
    },
    updatePassword(password: string) {
      self.password = password;
    },

    async getUsers() {
      const res = await fetch("/api/users/");
      if (res.ok) {
        return res.json();
      } else {
        return [];
      }
    },

    async login(username: string, password: string) {
      return await api.login(username, password);
    },
  }));
