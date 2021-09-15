import React, { useContext, useState } from "react";
import SampleContext from "../../contexts/SampleContext";
import MainPageButton from "../common/MainPageButton";
import SampleContextDispatcherContext from "../../contexts/SampleContextDispatcherContext";

type DeleteButtonProps = { index: number; onClick: (index: number) => void };

const DeleteMemberButton: React.FC<DeleteButtonProps> = ({
  index,
  onClick,
}: DeleteButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => {
        onClick(index);
      }}
    >
      Delete
    </button>
  );
};

const EditTeamInfoPage = (): React.ReactElement => {
  const { teamName, numTerms, members } = useContext(SampleContext);
  const dispatchTeamUpdate = useContext(SampleContextDispatcherContext);
  const [newMember, setNewMember] = useState<string>("");

  const setName = (e: React.FormEvent<HTMLInputElement>) => {
    dispatchTeamUpdate({ type: "EDIT_NAME", value: e.currentTarget.value });
  };

  const setNumTerms = (e: React.FormEvent<HTMLInputElement>) => {
    dispatchTeamUpdate({
      type: "EDIT_NUM_TERMS",
      value: parseInt(e.currentTarget.value, 10),
    });
  };

  const onMemberDelete = (index: number) => {
    dispatchTeamUpdate({
      type: "EDIT_MEMBERS",
      value: [...members.slice(0, index), ...members.slice(index + 1)],
    });
  };

  const onMemberAdd = () => {
    dispatchTeamUpdate({
      type: "EDIT_MEMBERS",
      value: [...members, newMember],
    });
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto", paddingTop: "20px" }}>
      <h1>Edit Team</h1>
      <div>
        Team Name: <input type="text" value={teamName} onChange={setName} />
      </div>
      <div style={{ marginTop: "1rem" }}>
        Num Terms:{" "}
        <input min={0} type="number" value={numTerms} onChange={setNumTerms} />
      </div>
      <div style={{ marginTop: "1rem" }}>
        Members:
        {members.map((_name, i) => (
          <div
            key={_name}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {_name}
            <DeleteMemberButton index={i} onClick={onMemberDelete} />
          </div>
        ))}
      </div>
      <div style={{ margin: "1rem 0" }}>
        <input
          type="text"
          value={newMember}
          onChange={(e) => {
            setNewMember(e.target.value);
          }}
        />
        <button type="button" onClick={onMemberAdd}>
          Add
        </button>
      </div>
      <MainPageButton />
    </div>
  );
};

export default EditTeamInfoPage;
