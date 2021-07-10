import { Input, Select } from "antd";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
  users: User[];
}

export const SearchPanel = ({ params, setParams, users }: SearchPanelProps) => {
  return (
    <form>
      <Input
        type="text"
        value={params.name}
        onChange={(evt) =>
          setParams({
            ...params,
            name: evt.target.value,
          })
        }
      />
      <Select
        value={params.personId}
        onChange={(value) =>
          setParams({
            ...params,
            personId: value,
          })
        }
      >
        <Select.Option value={""}>负责人</Select.Option>
        {users.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </form>
  );
};
