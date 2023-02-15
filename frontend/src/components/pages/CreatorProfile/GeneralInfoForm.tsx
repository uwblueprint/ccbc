import { Flex, Text } from "@chakra-ui/react";
import { PresentToAll } from "@material-ui/icons";
import React, { useContext, useMemo } from "react";

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

  const craftsMap = new Map<string, string>([
    ["illustrator", "Illustrator"],
    ["author", "Author"],
    ["storyteller", "Storyteller"],
  ]);
  const genresMap = new Map<string, string>([
    ["pictureBook", "Picture Book"],
    ["earlyChapterBooks", "Early Chapter Books"],
    ["middleGradeFiction", "Middle Grade Fiction"],
    ["teenFiction", "Teen Fictioj"],
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
      label: optionsMap.get(value) ?? value,
      value,
    }));
  };

  const setCrafts = (selectedCrafts: Option[]) => {
    console.log(selectedCrafts);
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
          options={[
            { label: "Illustrator", value: "illustrator" },
            { label: "Author", value: "author" },
            { label: "Storyteller", value: "storyteller" },
          ]}
          setOptions={() => {}}
          optionsSelected={crafts}
          setOptionsSelected={(options: Option[]) => setCrafts(options)}
          allowMultiSelectOption
          allowAddOption
          required
        />
        <AddMultiSelect
          id="genres"
          label="Genre"
          options={[
            { label: "Picture Book", value: "pictureBook" },
            { label: "Early Chapter Books", value: "earlyChapterBooks" },
            { label: "Middle Grade Fiction", value: "middleGradeFiction" },
            { label: "Teen Fiction", value: "teenFiction" },
            { label: "Non-Fiction", value: "nonFiction" },
            { label: "Graphic Novels", value: "graphicNovels" },
          ]}
          setOptions={() => {}}
          optionsSelected={genres}
          setOptionsSelected={(options: Option[]) => setGenres(options)}
          allowMultiSelectOption
          allowAddOption
          required
        />
        <AddMultiSelect
          id="presentations"
          label="Presentation(s)"
          options={[
            { label: "Readings", value: "readings" },
            { label: "Workshops", value: "workshops" },
            { label: "Other", value: "other" },
          ]}
          setOptions={() => {}}
          optionsSelected={presentations}
          setOptionsSelected={(options: Option[]) => setPresentations(options)}
          allowMultiSelectOption
          allowAddOption
          required
        />
        <CreatorInputField
          name="Website"
          placeholder="Enter a URL to your website"
          value={creatorProfile?.website}
          field="website"
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
