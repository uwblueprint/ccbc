import { Flex, Text } from "@chakra-ui/react";
import React, { useContext, useMemo, useState } from "react";

import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import { Option } from "../../../types/BookTypes";
import AddMultiSelect from "../CreateReview/AddMultiSelect";
import AddProfilePictureField from "./AddProfilePictureField";
import CreatorInputField from "./CreatorInputField";
import RichTextEditorField from "./RichTextEditorField";

interface GeneraInfoProps {
  submitted: boolean;
}

const GeneraInfoForm = ({ submitted }: GeneraInfoProps): React.ReactElement => {
  const { creatorProfile, setCreatorProfile } = useContext(
    CreatorProfileContext,
  );

  const [craftOptions, setCraftOptions] = useState([
    { label: "Illustrator", value: "illustrator" },
    { label: "Author", value: "author" },
    { label: "Storyteller", value: "storyteller" },
  ]);
  const [genreOptions, setGenreOptions] = useState([
    { label: "Picture Book", value: "pictureBook" },
    { label: "Early Chapter Books", value: "earlyChapterBooks" },
    { label: "Middle Grade Fiction", value: "middleGradeFiction" },
    { label: "Teen Fiction", value: "teenFiction" },
    { label: "Non-Fiction", value: "nonFiction" },
    { label: "Graphic Novels", value: "graphicNovels" },
  ]);

  const craftsMap = new Map<string, string>([
    ["illustrator", "Illustrator"],
    ["author", "Author"],
    ["storyteller", "Storyteller"],
  ]);
  const genresMap = new Map<string, string>([
    ["pictureBook", "Picture Book"],
    ["earlyChapterBooks", "Early Chapter Books"],
    ["middleGradeFiction", "Middle Grade Fiction"],
    ["teenFiction", "Teen Fiction"],
    ["nonFiction", "Non-Fiction"],
    ["graphicNovels", "Graphic Novels"],
  ]);

  const getOptionsArray = (
    valuesArray: string[],
    optionsMap: Map<string, string>,
  ) => {
    return valuesArray.map((value: string) => ({
      label: optionsMap.has(value) ? optionsMap.get(value) ?? value : value,
      value,
    }));
  };

  const setCrafts = (selectedCrafts: Option[]) => {
    const craftValues = selectedCrafts.map((craft) => craft.value);
    setCreatorProfile({
      ...creatorProfile,
      craft: craftValues,
    });
  };
  const setGenres = (selectedGenres: Option[]) => {
    const genreValues = selectedGenres.map((genre) => genre.value);
    setCreatorProfile({
      ...creatorProfile,
      genre: genreValues,
    });
  };
  const crafts = useMemo(() => {
    if (creatorProfile?.craft) {
      return getOptionsArray(creatorProfile.craft, craftsMap);
    }
    return [];
  }, [creatorProfile]);
  const genres = useMemo(() => {
    if (creatorProfile?.genre) {
      return getOptionsArray(creatorProfile.genre, genresMap);
    }
    return [];
  }, [creatorProfile]);

  return (
    <Flex flex="1" direction="column" justify="start" width={[300, 400, 500]}>
      <Text textStyle="heading" textAlign="left" fontWeight="bold">
        General Info
      </Text>
      <Text textAlign="left" mb="5">
        This is some caption here and is a placeholder for more information.
      </Text>
      <div>
        <AddMultiSelect
          id="crafts"
          label="Craft"
          options={craftOptions}
          placeholder="Select or type to add your own option"
          setOptions={setCraftOptions}
          maxWidth="33%"
          optionsSelected={crafts}
          setOptionsSelected={(options: Option[]) => setCrafts(options)}
          allowMultiSelectOption
          allowAddOption
          error={submitted}
          required
        />
        <AddMultiSelect
          id="genres"
          label="Genre"
          options={genreOptions}
          placeholder="Select or type to add your own option"
          setOptions={setGenreOptions}
          maxWidth="33%"
          optionsSelected={genres}
          setOptionsSelected={(options: Option[]) => setGenres(options)}
          allowMultiSelectOption
          allowAddOption
          error={submitted}
          required
        />
        <CreatorInputField
          name="Website"
          placeholder="Enter a URL to your website"
          value={creatorProfile?.website}
          field="website"
          required={false}
          width="33%"
          error={submitted}
        />
        <RichTextEditorField
          name="Bio"
          placeholder="Here's where you can briefly describe who you are as a creator!"
        value={creatorProfile?.bio}
          field="bio"
          error={submitted}
          charLimit={500}
        />
        <AddProfilePictureField
          name="Profile Picture"
          value={creatorProfile?.profilePictureLink}
          field="profilePictureLink"
          error={submitted}
          setInputField={()=>{}}
          mode="CreatorProfile"
          required
        />
      </div>
    </Flex>
  );
};

// TODO:
// - Add checkmark after step is finished on the right
// - Check spacing issue with different form sizes
// - Multiselect, add picture, and paragraph textbodx

export default GeneraInfoForm;
