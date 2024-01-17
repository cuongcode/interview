import clsx from "clsx";
import { Text } from "./text";
import { UserRow } from "./user-row";

export const UserBoard = ({users, className}:{users:any; className:string}) => {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
    <div className="grid grid-cols-3 w-72">
      <Text preset="p4" text="Name"/>
      <Text preset="p4" text="BTC"/>
      <Text preset="p4" text="USDT"/>
    </div>
    {users?.map((user:any) => <UserRow user={user} />)}
  </div>
  );
};