import { Text } from './text'

export const UserRow = ({user}:{user:any}) => {
    return (
      <div key={user.name} className="grid grid-cols-3 w-72">
        <Text preset="p4" text={user.name.toString()}/>
        <Text preset="p4" text={user.btc.toString()} />
        <Text preset="p4" text={user.usdt.toString()} />
      </div>
    );
  }