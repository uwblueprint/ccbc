/* eslint-disable react/jsx-props-no-spreading */
import { Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { IoReorderTwoOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";

import CreatorProfileContext from "../../../../contexts/CreatorProfileContext";
import {
  BibliographyEntry,
  CreatorProfile,
} from "../../../../types/CreatorProfileTypes";
import { Publication } from "../../../../types/CreatorTypes";

const BibliographyDragAndDrop = (): React.ReactElement => {
  const { creatorProfile, setCreatorProfile } = useContext(
    CreatorProfileContext,
  );

  const setBibliography = (bib: Publication[]) => {
    const creatorProfileObj: CreatorProfile = {
      ...creatorProfile,
    };
    creatorProfileObj.publications = [...bib];
    setCreatorProfile(creatorProfileObj);
  };

  // Handle list reordering
  const handleOnDragEnd = (res: DropResult) => {
    if (!res.destination) return;

    const items = Array.from(creatorProfile?.publications ?? []);
    const [reorderedItem] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, reorderedItem);

    setBibliography(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="bibliography">
        {(provided: any) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ listStyleType: "none" }}
          >
            {creatorProfile?.publications &&
              creatorProfile.publications.map(
                ({ title, publisher, publication_year, notes }, index) => {
                  return (
                    <Draggable
                      key={`bib-${index}`}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(x: any, snapshot: any) => (
                        <li
                          ref={x.innerRef}
                          {...x.draggableProps}
                          {...x.dragHandleProps}
                        >
                          <Flex
                            justifyContent="space-between"
                            style={{
                              backgroundColor: snapshot.isDragging
                                ? "#d8f5f3"
                                : "",
                            }}
                            mb="16px"
                          >
                            <Flex alignItems="center">
                              <Divider
                                orientation="vertical"
                                height="62px"
                                borderWidth="0px 3px"
                                mr="22px"
                              />
                              <Text>
                                <b>
                                  {title}, {publisher}, {publication_year}
                                </b>
                                <br />
                                <i>{notes}</i>
                              </Text>
                            </Flex>
                            <Flex alignItems="center">
                              <IconButton
                                aria-label="Delete entry"
                                icon={
                                  <MdOutlineDeleteOutline
                                    style={{ scale: "130%" }}
                                  />
                                }
                                onClick={() => {
                                  const tempBib =
                                    creatorProfile?.publications ?? [];
                                  tempBib.splice(index, 1);
                                  setBibliography([...tempBib]);
                                }}
                              />
                              <IoReorderTwoOutline style={{ scale: "130%" }} />
                            </Flex>
                          </Flex>
                        </li>
                      )}
                    </Draggable>
                  );
                },
              )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BibliographyDragAndDrop;
