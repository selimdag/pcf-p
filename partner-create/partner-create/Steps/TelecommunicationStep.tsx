import * as React from "react";
import {
  Label,
  Separator,
  TextField,
  Text,
  StackItem,
  IStackProps,
  IStackItemProps,
  Dropdown,
  IDropdownOption,
  TooltipHost,
  DirectionalHint,
} from "@fluentui/react";
import { Stack } from "@fluentui/react";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { mergeStyles } from "@fluentui/react/lib/Styling";

const cardStyle: React.CSSProperties = {
  padding: 16,
  border: "1px solid #E1DFDD",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  borderRadius: 4,
};

const placeHolderDropdownOptions: IDropdownOption[] = [
  {
    key: "placeholder1",
    text: "Placeholder Country1 (+99)",
    selected: false,
    disabled: false,
  },
  {
    key: "placeholder2",
    text: "Placeholder Country2 (+98)",
    selected: false,
    disabled: false,
  },
];

interface TwoColumnStackProps extends IStackProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftItemProps?: IStackItemProps;
  rightItemProps?: IStackItemProps;
}

export const TwoColumnStackWithSpacer: React.FC<TwoColumnStackProps> = ({
  leftContent,
  leftItemProps,
  rightContent,
  rightItemProps,
  ...stackProps
}) => {
  return (
    <Stack
      horizontal
      tokens={{ childrenGap: 8 }}
      styles={{ root: { margin: "16px 0" } }}
      {...stackProps}
    >
      <StackItem
        {...leftItemProps}
        styles={{ root: { width: "30%", background: "white" } }}
      >
        {leftContent}
      </StackItem>
      <StackItem />
      <StackItem
        {...rightItemProps}
        styles={{ root: { width: "50%", background: "white" } }}
      >
        {rightContent}
      </StackItem>
    </Stack>
  );
};

interface ThreeColumnStackProps extends IStackProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  thirdContent: React.ReactNode;
  firstStackItemProps?: IStackItemProps;
  secondStackItemProps?: IStackItemProps;
  thirdStackItemProps?: IStackItemProps;
}

export const ThreeColumnStackWithSpacer: React.FC<ThreeColumnStackProps> = ({
  firstContent,
  firstStackItemProps: firstItemProps,
  secondContent,
  secondStackItemProps: secondItemProps,
  thirdContent,
  thirdStackItemProps: thirdItemProps,
  ...stackProps
}) => {
  return (
    <Stack
      horizontal
      tokens={{ childrenGap: 8 }}
      styles={{ root: { margin: "16px 0" } }}
      {...stackProps}
    >
      <Stack.Item
        {...firstItemProps}
        styles={{
          root: { width: "30%", background: "white" },
        }}
      >
        {firstContent}
      </Stack.Item>
      <Stack.Item
        {...secondItemProps}
        styles={{
          root: { width: "50%", background: "white" },
        }}
      >
        {secondContent}
      </Stack.Item>
      <Stack.Item
        {...thirdItemProps}
        styles={{
          root: { width: "20%", background: "white" },
        }}
      >
        {thirdContent}
      </Stack.Item>
    </Stack>
  );
};

const textPlaceholderStyle = {
  field: {
    selectors: {
      "::placeholder": {
        color: "#8A8886",
      },
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TelecommunicationStep = ({ context, updateFormData, formData }: any): JSX.Element => {

  const [phoneCountry, setPhoneCountry] = React.useState(formData.phoneCountry?.key);
  const [phoneNo, setPhoneNo] = React.useState(formData.phoneNo?.text);
  const [mobilePhoneNo, setMobilePhoneNo] = React.useState(formData.mobilePhoneNo?.text);
  const [faxNo, setFaxNo] = React.useState(formData.faxNo?.text);
  const [Description, setDescription] = React.useState(formData.Description?.text);
  const [Email, setEmail] = React.useState(formData.Email?.text);
  const [Website, setWebsite] = React.useState(formData.Website?.text);

  return (
    <Stack
      id="MainStack"
      style={{ margin: "16px 16px 0 16px" }}
      horizontal
      tokens={{ childrenGap: 16 }}
    >
      <Stack.Item
        id="LeftStackStart"
        grow
        styles={{
          root: { width: "50%", background: "white", minHeight: "500px" },
        }}
        style={cardStyle}
      >
        <Stack id="LeftTitleStack" horizontalAlign="start">
          <Text variant="xLarge">Phone & Fax</Text>
        </Stack>
        <Separator />
        {/* Spacing is not correct yet for the following stack element, i believe*/}
        <Stack horizontalAlign="start" style={{ margin: "16px 0px" }} />

        <TwoColumnStackWithSpacer
          id="CountryStack"
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
          leftContent={
            <Label style={{ textAlign: "left", minWidth: "8vw" }}>
              Country*
            </Label>
          }
          rightContent={
            <Dropdown
              placeholder="Select an option"
              options={placeHolderDropdownOptions}
              selectedKey={phoneCountry}
              onChange={(_, option) => {
                setPhoneCountry(option?.key as string);
                updateFormData({"phoneCountry": option});
                console.log("option: ", option);
              }}

              styles={{
                title: {
                  textAlign: "left",
                  selectors: {
                    "[data-placeholder='true']": {
                      color: "#8A8886", // your desired placeholder color
                    },
                  },
                },
                dropdown: {
                  textAlign: "left",
                },
              }}
            />
          }
        />
        <TwoColumnStackWithSpacer
          id="PhoneNoStack"
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
          leftContent={
            <Label style={{ textAlign: "left", minWidth: "8vw" }}>
              Phone No*
            </Label>
          }
          rightContent={
            <TextField
              placeholder="Excluding Countrycode"
              style={{ width: "20vw" }}
              styles={textPlaceholderStyle}
              value={phoneNo}
              onChange={(_, newValue) => {
                setPhoneNo(newValue || "");
                updateFormData({"phoneNo": {text: newValue }});
              }}
            />
          }
        />
        <TwoColumnStackWithSpacer
          id="MobilePhoneNoStack"
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
          leftContent={
            <Label style={{ textAlign: "left", minWidth: "8vw" }}>
              Mobile Phone No
            </Label>
          }
          rightContent={
            <TextField
              placeholder="Excluding Countrycode"
              style={{ width: "20vw" }}
              styles={textPlaceholderStyle}
              value={mobilePhoneNo}
              onChange={(_, newValue) => {
                setMobilePhoneNo(newValue || "");
                updateFormData({"mobilePhoneNo": { text: newValue }});
              }}
            />
          }
        />
        <TwoColumnStackWithSpacer
          id="FaxNoStack"
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
          leftContent={
            <Label style={{ textAlign: "left", minWidth: "8vw" }}>Fax No</Label>
          }
          rightContent={
            <TextField
              placeholder="Excluding Countrycode"
              style={{ width: "20vw" }}
              styles={textPlaceholderStyle}
              value={faxNo}
              onChange={(_, newValue) => {
                setFaxNo(newValue || "");
                updateFormData({"faxNo": { text: newValue }});
              }}
            />
          }
        />
        <TwoColumnStackWithSpacer
          id="DescriptionStack"
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
          leftContent={
            <Label style={{ textAlign: "left", minWidth: "8vw" }}>
              Description
            </Label>
          }
          leftItemProps={{ align: "baseline" }}
          rightContent={
            <TextField multiline rows={5} style={{ width: "20vw" }} 
            value={Description}
            onChange={(_, newValue) => {
              setDescription(newValue || "");
              updateFormData({"Description": { text: newValue }});
            }}
            />
          
          }
        />
      </Stack.Item>

      <Stack.Item
        grow
        styles={{ root: { width: "50%", background: "white" } }}
        style={cardStyle}
      >
        <Stack horizontalAlign="start">
          <Text variant="xLarge">Digital Communication</Text>
        </Stack>
        <Separator />
        <Stack horizontalAlign="start" style={{ margin: "16px 0px" }} />

        <ThreeColumnStackWithSpacer
          id="EmailStack"
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
          firstContent={
            <Label style={{ textAlign: "left", minWidth: "8vw" }}>Email</Label>
          }
          secondContent={
            <TextField
              placeholder="e.g. max@mustermann.com"
              style={{ width: "20vw" }}
              styles={textPlaceholderStyle}
              value={Email}
              onChange={(_, newValue) => {
                setEmail(newValue || "");
                updateFormData({"Email": { text: newValue }});
              }
              }
            />
          }
          thirdContent={<Stack.Item></Stack.Item>}
        />
        <ThreeColumnStackWithSpacer
          id="WebsiteStack"
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
          firstContent={
            <Label style={{ textAlign: "left", minWidth: "8vw" }}>
              Website
            </Label>
          }
          secondContent={
            <TextField
              placeholder="e.g. www.mustermann.de"
              style={{ width: "20vw" }}
              styles={textPlaceholderStyle}
              value={Website}
              onChange={(_, newValue) => {
                setWebsite(newValue || "");
                updateFormData({"Website": { text: newValue }});
              }}
            />
          }
          thirdContent={
            <Stack horizontal verticalAlign="center">
              <Stack.Item>
                <TooltipHost
                  directionalHint={DirectionalHint.bottomCenter}
                  content={
                    <>
                      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                        Information Tooltip
                      </div>
                      <div>This is your explanatory content line.</div>
                    </>
                  }
                  id={"WebsiteToolTip"}
                  calloutProps={{ gapSpace: 0 }}
                  styles={{
                    root: { display: "flex", verticalAlign: "middle" },
                  }}
                >
                  <FontIcon
                    aria-label="Info"
                    iconName="Info"
                    className={mergeStyles({
                      fontSize: 14,
                      color: "#0078D4",
                    })}
                  />
                </TooltipHost>
              </Stack.Item>
              <Stack.Item />
            </Stack>
          }
        />
      </Stack.Item>
    </Stack>
  );
};

export default TelecommunicationStep;
