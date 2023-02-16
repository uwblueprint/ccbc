import { Flex, Text } from "@chakra-ui/react";
import { PresentToAll } from "@material-ui/icons";
import React, { useContext, useMemo, useState } from "react";

import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import { Option } from "../../../types/BookTypes";
import AddMultiSelect from "../CreateReview/AddMultiSelect";
import CreatorInputField from "./CreatorInputField";

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
  const [presentationOptions, setPresentationOptions] = useState([
    { label: "Readings", value: "readings" },
    { label: "Workshops", value: "workshops" },
    { label: "Other", value: "other" },
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
  const presentationsMap = new Map<string, string>([
    ["readings", "Readings"],
    ["workshops", "Workshops"],
    ["other", "Other"],
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
      crafts: craftValues,
    });
  };
  const setGenres = (selectedGenres: Option[]) => {
    const genreValues = selectedGenres.map((genre) => genre.value);
    setCreatorProfile({
      ...creatorProfile,
      genres: genreValues,
    });
  };
  const setPresentations = (selectedPresentations: Option[]) => {
    const presentationValues = selectedPresentations.map(
      (presentation) => presentation.value,
    );
    setCreatorProfile({
      ...creatorProfile,
      presentations: presentationValues,
    });
  };
  const crafts = useMemo(() => {
    if (creatorProfile?.crafts) {
      return getOptionsArray(creatorProfile.crafts, craftsMap);
    }
    return [];
  }, [creatorProfile]);
  const genres = useMemo(() => {
    if (creatorProfile?.genres) {
      return getOptionsArray(creatorProfile.genres, genresMap);
    }
    return [];
  }, [creatorProfile]);
  const presentations = useMemo(() => {
    if (creatorProfile?.presentations) {
      return getOptionsArray(creatorProfile.presentations, presentationsMap);
    }
    return [];
  }, [creatorProfile]);

  return (
    <Flex flex="1" direction="column" justify="start">
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
          optionsSelected={crafts}
          setOptionsSelected={(options: Option[]) => setCrafts(options)}
          allowMultiSelectOption
          allowAddOption
          maxWidth="443px"
          error={submitted}
          required
        />
        <AddMultiSelect
          id="genres"
          label="Genre"
          options={genreOptions}
          placeholder="Select or type to add your own option"
          setOptions={setGenreOptions}
          optionsSelected={genres}
          setOptionsSelected={(options: Option[]) => setGenres(options)}
          allowMultiSelectOption
          allowAddOption
          error={submitted}
          maxWidth="443px"
          required
        />
        <AddMultiSelect
          id="presentations"
          label="Presentation"
          placeholder="Select option(s)"
          options={presentationOptions}
          setOptions={setPresentationOptions}
          optionsSelected={presentations}
          setOptionsSelected={(options: Option[]) => setPresentations(options)}
          allowMultiSelectOption
          error={submitted}
          maxWidth="443px"
          required
        />
        <CreatorInputField
          name="Website"
          placeholder="Enter a URL to your website"
          value={creatorProfile?.website}
          field="website"
          required={false}
          error={submitted}
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
