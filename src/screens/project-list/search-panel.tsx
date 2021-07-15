import { Form, Input } from "antd";
import { Project } from "./list";
import { UseSelect } from "../../components/use-select";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  params: Partial<Pick<Project, "name" | "personId">>;
  setParams: (params: SearchPanelProps["params"]) => void;
  users: User[];
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
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
      </Form.Item>
      <Form.Item>
        <UseSelect
          defaultOptionName={"负责人"}
          value={params.personId}
          onChange={(value) =>
            setParams({
              ...params,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
