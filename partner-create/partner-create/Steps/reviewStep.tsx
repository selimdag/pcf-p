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
FontIcon,
  IComboBox,
  ActionButton,
  IIconProps,
} from "@fluentui/react";
import { Stack } from "@fluentui/react";

const cardStyle: React.CSSProperties = {
  padding: 16,
  border: "1px solid #E1DFDD",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  borderRadius: 4,
};


const editIcon: IIconProps = { iconName: 'Edit',  style: { color: 'orange' }  };

const keyStyle = { root: { textAlign: "left",flex: "0 0 18%" } };
const valueStyle = { root: { textAlign: "left",flex: "0 0 16%" } };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReviewStep = ({ context, goToStep, formData }:any): JSX.Element => {
  return (
    <Stack
      style={{ margin: "16px 16px 0 16px" }}
      horizontal
      tokens={{ childrenGap: 16 }}
    >
      {/* Left half */}
      <Stack.Item
        grow
        styles={{
          root: {minHeight: "534px", width: "50%"},
        }}
      >

      {/* Partner Type */}
      <Stack.Item
        grow
        styles={{
          root: { background: "white", },
        }}
        style={cardStyle}
      >
        <Stack horizontalAlign="start">
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center"  styles={{ root: { width: "100%" } }}>
            <Text variant="xLarge">Partner Type</Text>
            <ActionButton onClick={() => goToStep(0)} iconProps={editIcon} allowDisabledFocus>
              Edit
            </ActionButton>
          </Stack>
        </Stack>
        <Separator />
          <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500"}}>Partner type:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>{formData?.partnerType?.text}</Text>
            </Stack.Item>
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500" }}>Partner Subtype:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>{formData?.partnerSubType?.text}</Text>
            </Stack.Item>
          </Stack>
       </Stack.Item>

      {/* Partner Name */}
      <Stack.Item
        grow
        styles={{
          root: { background: "white", marginTop: "16px" },
        }}
        style={cardStyle}
      >
        <Stack horizontalAlign="start">
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center"  styles={{ root: { width: "100%" } }}>
            <Text variant="xLarge">Partner Name</Text>
            <ActionButton onClick={() => goToStep(2)} iconProps={editIcon} allowDisabledFocus>
              Edit
            </ActionButton>
          </Stack>
        </Stack>
        <Separator />
          <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500"}}>Partner Name:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>{formData?.partnerName?.text}</Text>
            </Stack.Item>
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500" }}>DUNS No.:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>Value2</Text>
            </Stack.Item>
          </Stack>
          <Stack horizontal style={{marginTop: "16px"}} tokens={{ childrenGap: 16 }} verticalAlign="center">
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500"}}>Legal Entity Type:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>Value1</Text>
            </Stack.Item>
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500" }}>Language:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>Value2</Text>
            </Stack.Item>
          </Stack>
          <Stack horizontal style={{marginTop: "16px"}} tokens={{ childrenGap: 16 }} verticalAlign="center">
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500"}}>Partner Subtype2:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>Value1</Text>
            </Stack.Item>
          </Stack>
       </Stack.Item>

      {/* Tenant, GeoZone, Location */}
      <Stack.Item
        grow
        styles={{
          root: { background: "white", marginTop: "16px" },
        }}
        style={cardStyle}
      >
        <Stack horizontalAlign="start">
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center"  styles={{ root: { width: "100%" } }}>
            <Text variant="xLarge">Tenant, GeoZone, Location</Text>
            <ActionButton onClick={() => goToStep(0)} iconProps={editIcon} allowDisabledFocus>
              Edit
            </ActionButton>
          </Stack>
        </Stack>
        <Separator />
          <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500"}}>Tenant:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>Value1</Text>
            </Stack.Item>
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500" }}>GeoZone:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>Value2</Text>
            </Stack.Item>
          </Stack>
          <Stack horizontal style={{marginTop: "16px"}} tokens={{ childrenGap: 16 }} verticalAlign="center">
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500"}}>Location:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>Value1</Text>
            </Stack.Item>
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500" }}>Location Unit:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>Value2</Text>
            </Stack.Item>
          </Stack>
          <Stack horizontal style={{marginTop: "16px"}} tokens={{ childrenGap: 16 }} verticalAlign="center">
            <Stack.Item styles={keyStyle}>
              <Text variant="medium" style={{ fontWeight: "500"}}>Owner:</Text>
            </Stack.Item>
            <Stack.Item styles={valueStyle}>
              <Text>Value1</Text>
            </Stack.Item>
          </Stack>
       </Stack.Item>


      </Stack.Item>


      {/* Right half */}
      <Stack.Item
        grow
        styles={{ root: { width: "50%"} }}
      >
        { /* Partner Address */ }
        <Stack.Item
          grow
          styles={{ root: {  background: "white" } }}
          style={cardStyle}
        >
          <Stack horizontalAlign="start">
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center"  styles={{ root: { width: "100%" } }}>
            <Text variant="xLarge">Partner Address</Text>
            <ActionButton onClick={() => goToStep(2)} iconProps={editIcon} allowDisabledFocus>
              Edit
            </ActionButton>
          </Stack>
          </Stack>
          <Separator />
            <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500"}}>Adress Type:</Text>
              </Stack.Item>
              <Stack.Item styles={valueStyle}>
                <Text>Value1</Text>
              </Stack.Item>
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500" }}>Street:</Text>
              </Stack.Item>
              <Stack.Item styles={valueStyle}>
                <Text>Value2</Text>
              </Stack.Item>
            </Stack>
            <Stack horizontal style={{marginTop: "16px"}} tokens={{ childrenGap: 16 }} verticalAlign="center">
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500"}}>City:</Text>
              </Stack.Item>
              <Stack.Item styles={valueStyle}>
                <Text>Value1</Text>
              </Stack.Item>
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500" }}>Country:</Text>
              </Stack.Item>
              <Stack.Item styles={valueStyle}>
                <Text>Value2</Text>
              </Stack.Item>
            </Stack>
            <Stack horizontal style={{marginTop: "16px"}} tokens={{ childrenGap: 16 }} verticalAlign="center">
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500"}}>County:</Text>
              </Stack.Item>
              <Stack.Item styles={valueStyle}>
                <Text>Value1</Text>
              </Stack.Item>
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500" }}>Partner Subtype:</Text>
              </Stack.Item>
              <Stack.Item styles={valueStyle}>
                <Text>Value2</Text>
              </Stack.Item>
            </Stack>
        </Stack.Item>

        { /* Telecommunication */ }
        <Stack.Item
          grow
          styles={{ root: {  background: "white", marginTop: "16px" } }}
          style={cardStyle}
        >
          <Stack horizontalAlign="start">
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center"  styles={{ root: { width: "100%" } }}>
              <Text variant="xLarge">Telecommunication</Text>
              <ActionButton onClick={() => goToStep(3)} iconProps={editIcon} allowDisabledFocus>
                Edit
              </ActionButton>
            </Stack>
          </Stack>
          <Separator />
            <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500"}}>Country:</Text>
              </Stack.Item>
              <Stack.Item styles={valueStyle}>
                <Text>Value1</Text>
              </Stack.Item>
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500" }}>Phone:</Text>
              </Stack.Item>
              <Stack.Item styles={valueStyle}>
                <Text>Value2</Text>
              </Stack.Item>
            </Stack>
            <Stack horizontal style={{marginTop: "16px"}} tokens={{ childrenGap: 16 }} verticalAlign="center">
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500"}}>Mobile Phone No:</Text>
              </Stack.Item>
              <Stack.Item styles={valueStyle}>
                <Text>Value1</Text>
              </Stack.Item>
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500" }}>Fax No.:</Text>
              </Stack.Item>
              <Stack.Item styles={valueStyle}>
                <Text>Value2</Text>
              </Stack.Item>
            </Stack>
            <Stack horizontal style={{marginTop: "16px"}} tokens={{ childrenGap: 16 }} verticalAlign="start">
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500"}}>Description:</Text>
              </Stack.Item>
              <Stack.Item styles={ { root: { textAlign: "left",flex: "0 0 56%" } }}>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</Text>
              </Stack.Item>
            </Stack>
            <Stack horizontal style={{marginTop: "16px"}} tokens={{ childrenGap: 16 }} verticalAlign="start">
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500"}}>E-Mail:</Text>
              </Stack.Item>
              <Stack.Item styles={ { root: { textAlign: "left",flex: "0 0 56%" } }}>
                <Text>value@key.code</Text>
              </Stack.Item>
            </Stack>
            <Stack horizontal style={{marginTop: "16px"}} tokens={{ childrenGap: 16 }} verticalAlign="start">
              <Stack.Item styles={keyStyle}>
                <Text variant="medium" style={{ fontWeight: "500"}}>Website:</Text>
              </Stack.Item>
              <Stack.Item styles={ { root: { textAlign: "left",flex: "0 0 56%" } }}>
                <Text>http://placeholde.example.com</Text>
              </Stack.Item>
            </Stack>
        </Stack.Item>
      </Stack.Item>
    </Stack>
  );
};

export default ReviewStep;
