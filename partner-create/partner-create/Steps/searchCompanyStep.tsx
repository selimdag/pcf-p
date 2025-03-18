import * as React from "react";
import {
  ComboBox,
  IComboBoxOption,
  Label,
  Pivot,
  PivotItem,
  SelectableOptionMenuItemType,
  Separator,
  TextField,
  Text,
  IComboBox,
  Icon,
  FontIcon,
  FontSizes,
} from "@fluentui/react";
import { Stack } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import { Link } from "@fluentui/react";
import { useState } from "react";
import { PrimaryButton } from "@fluentui/react";
import { hdiButtonStyle } from "../styles";
import Footer from "../Footer";
import { on } from "events";

// @TODO: Add Loading Spinner

interface IsearchCompanyProps {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCompanySearchResults: (resultContent: any) => void;

  onNextStep: () => void;

}
const cardStyle: React.CSSProperties = {
  padding: 16,
  border: "1px solid #E1DFDD",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  borderRadius: 4,
};

const TextfieldStackStyle: React.CSSProperties = {
  maxWidth: "18%",
};

const iconStyle: React.CSSProperties = {
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 auto',
};

const SearchCompanyStep = (props: IsearchCompanyProps ): JSX.Element => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [foundItems, setFoundItems] = useState<any>(null);

  const search = async () => {
    console.log("Searching...");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([]);
      }, 200);
    }); 
  };

  const handleSearch = async () => {
    console.log("Search Databases button clicked");
    const results = await search();
    setFoundItems(results);
    props.onCompanySearchResults(results);
  };

  const heightSizes =  !showAdvanced ? [169, 281] : [230, 220];
  
  return (

    <Stack style={{ margin: "16px 16px 0 16px" }} tokens={{ childrenGap: 16 }}>
      <Stack.Item
        grow
        styles={{ root: { background: "white", minHeight: `${heightSizes[0]}px` } }}
        style={cardStyle}
      >
        <Stack horizontalAlign="start">
          <Text variant="xLarge">Search Database for existing records</Text>
        </Stack>
        <Separator />
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow style={TextfieldStackStyle}>
            <TextField
              label="Name"
              placeholder="Use * for wildcard search"
              styles={{
                subComponentStyles: { label: { root: { textAlign: "left" } } },
              }}
            />
          </Stack.Item>
          <Stack.Item grow style={TextfieldStackStyle}>
            <TextField
              label="Duns No."
              placeholder="e.g 3176521"
              styles={{
                subComponentStyles: { label: { root: { textAlign: "left" } } },
              }}
            />
          </Stack.Item>
          <Stack.Item grow style={TextfieldStackStyle}>
            <TextField
              label="HDI Customer No."
              placeholder="e.g 1.004.500.666"
              styles={{
                subComponentStyles: { label: { root: { textAlign: "left" } } },
              }}
            />
          </Stack.Item>
          <Stack.Item grow style={TextfieldStackStyle}>
            <ComboBox
              label="Country"
              placeholder="Please select"
              options={[{ key: "1", text: "Germany" }]}
              styles={{ label: { textAlign: "left" } }}
            />
          </Stack.Item>
          <Stack.Item grow>
            <Stack verticalAlign="end" styles={{ root: { height: '100%' } }}>
              <Link style={{ color: "#3c8a5a" }} onClick={() => setShowAdvanced(!showAdvanced)}>
                {!showAdvanced ? (
                  <>Show advanced search options</>
                ) : (
                  <>Do not show advanced search options</>
                )}
              </Link>
            </Stack>
          </Stack.Item>
        </Stack>
          
        {showAdvanced && (
        /* This is the advanced search options */
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow style={TextfieldStackStyle}>
            <TextField
              label="Street"
              styles={{
                subComponentStyles: { label: { root: { textAlign: "left" } } },
              }}
            />
          </Stack.Item>
          <Stack.Item grow style={TextfieldStackStyle}>
            <TextField
              label="ZIP / Post Code"
              styles={{
                subComponentStyles: { label: { root: { textAlign: "left" } } },
              }}
            />
          </Stack.Item>
          <Stack.Item grow style={TextfieldStackStyle}>
            <TextField
              label="City"
              styles={{
                subComponentStyles: { label: { root: { textAlign: "left" } } },
              }}
            />
          </Stack.Item>
        </Stack>)}

        <Stack horizontal tokens={{ childrenGap: 16 }} style={{ marginTop: 16, float: "left" }}>
          <Stack.Item grow>
            <PrimaryButton style={hdiButtonStyle} text="Search Databases" onClick={handleSearch} />
          </Stack.Item>
        </Stack>

      </Stack.Item>


      { /* This is the second card  */ }
      <Stack.Item
        grow
        styles={{ root: { background: "white", minHeight: `${heightSizes[1]}px` } }}
        style={cardStyle}
      >

        {/* Inital Text for the user */ }
        {foundItems === null && (
        <Stack horizontalAlign="start" style={{ margin: "16px 0 0 0" }}>
          <FontIcon iconName="Copy" style={iconStyle} />
          <Text variant="xLarge" style={{ margin: "16px auto 0 auto" }}>
              Help us improve our DataQuality:
          </Text>
          <Text variant="xLarge" style={{ margin: "0 auto 0 auto" }}>
             Search Database for matching existing records to create new partners
          </Text>
        <Text variant="medium" style={{ margin: "32px auto 0 auto" }}>
            Search the Database for existing records, select a matching partner in order to replicate the
        </Text>
        <Text variant="medium" style={{ margin: "0 auto 0 auto" }}>
              partner within your GeoZone. Your office will become the data owner.
        </Text>
        </Stack>
        )}

        {/* If no results are found */ }
        {foundItems && foundItems.length === 0 && (
        <Stack horizontalAlign="start" style={{ margin: "16px 0 0 0" }}>
          <FontIcon iconName="Search" style={iconStyle} />
          <Text variant="xLarge" style={{ margin: "16px auto 0 auto" }}>
            No matches found. Refine your search or continue
          </Text>
          <Text variant="xLarge" style={{ margin: "0 auto 0 auto" }}>
            By Skipping the search and enter the Partner Infos manually.
          </Text>
        <Text variant="medium" style={{ margin: "32px auto 0 auto" }}>
              <Link style={{ color: "#3c8a5a" }} onClick={() => props.onNextStep()}>
                Click here to skip the search
              </Link>
        </Text>
        </Stack>
        )}

      </Stack.Item>
    </Stack>

  );
};

export default SearchCompanyStep;
