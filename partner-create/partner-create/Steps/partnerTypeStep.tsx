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
} from "@fluentui/react";
import { Stack } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import { useEffect } from "react";

const cardStyle: React.CSSProperties = {
  padding: 16,
  border: "1px solid #E1DFDD",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  borderRadius: 4,
};

const PartnerTypeOptions: IComboBoxOption[] = [
  { key: "customer", text: "Customer" },
  { key: "broker", text: "Broker" },
  { key: "reinsurer", text: "Reinsurer" },
  { key: "insurer", text: "Insurer" },
  { key: "other", text: "Other" },
];

const CustomerSubTypeOptions: IComboBoxOption[] = [
  { key: "0", text: "Prospect" },
  { key: "1", text: "Client" },
  { key: "2", text: "Additional Named Insured" },
];

const BrokerSubTypeOptions: IComboBoxOption[] = [
  { key: "0", text: "Broker" },
  { key: "1", text: "Insurance Agent" },
  { key: "2", text: "Inhouse Broker" },
  { key: "3", text: "Reinsurance Broker" },
  { key: "4", text: "Underwriting Agent" },
  { key: "5", text: "MAG" },
  { key: "6", text: "Broker Pool" },
  { key: "7", text: "Authorized Representation" },
  { key: "8", text: "Corporate Authorized Representation" },
];

const ReinsurerSubTypeOptions: IComboBoxOption[] = [
  { key: "0", text: "Capative" },
  { key: "1", text: "Insurer" },
  { key: "2", text: "Mixed Insurer" },
  { key: "3", text: "Reinsurer" },
  { key: "4", text: "Pool" },
  { key: "5", text: "Syndicate" },
  { key: "6", text: "Other" },
];

const OtherSubTypeOptions: IComboBoxOption[] = [
  { key: "0", text: "Claims Partner" },
  { key: "1", text: "Claims Misc.Partner" },
  { key: "2", text: "Loss Adjuster" },
  { key: "3", text: "Solicitor/Lawyer" },
  { key: "4", text: "Claimant" },
  { key: "5", text: "Security Certificate Creditor" },
  { key: "6", text: "Alternative Car Owner" },
  { key: "7", text: "Expert" },
  { key: "8", text: "Doctor" },
  { key: "9", text: "Other Partner" },
];

const tenantOptions: IComboBoxOption[] = [
  { key: "HdiGlobalSe", text: "HDI Global SE", selected: true },
];

const geozoneOptions: IComboBoxOption[] = [
  { key: "emea", text: "EMEA", selected: true },
];

const locationOptions: IComboBoxOption[] = [
  { key: "002", text: "002 - Germany", selected: true },
];

const locationUnitOptions: IComboBoxOption[] = [
  { key: "100", text: "100 - Berlin", selected: true },
];

const ownerOptions: IComboBoxOption[] = [
  { key: "112234", text: "Maurice Schmicking", selected: true },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PartnerTypeStep = ({ updateFormData, formData }: any): JSX.Element => {
  const textFieldSubtype2 = useId("PartnerSubtype2");

  function getSubTypeOptions(partnerType: string): IComboBoxOption[] {
    if (partnerType === "customer") {
      return CustomerSubTypeOptions;
    } else if (partnerType === "broker") {
      return BrokerSubTypeOptions;
    } else if (partnerType === "reinsurer") {
      return ReinsurerSubTypeOptions;
    } else if (partnerType === "other") {
      return OtherSubTypeOptions;
    } else {
      return [];
    }
  }

  const [selectedPartnerType, setSelectedPartnerType] = React.useState(
    formData?.partnerType?.key
  );
  const [selectedPartnerSubType, setSelectedPartnerSubType] = React.useState(
    formData?.partnerSubType?.key
  );
  const [subTypeOptions, setSubTypeOptions] = React.useState<IComboBoxOption[]>(
    getSubTypeOptions(formData?.partnerType?.key)
  );
  const [partnerSubType2, setPartnerSubType2] = React.useState(
    formData?.partnerSubType2
  );
  
  function changePartnerSubTypeOptions(
    event: React.FormEvent<IComboBox>,
    item?: IComboBoxOption,
    index?: number,
    value?: string
  ): void {
    if (!item) return;
    setSubTypeOptions(getSubTypeOptions(item.key.toString()));
    setSelectedPartnerType(item.key);
    updateFormData({ partnerType: item });
  }

  return (
    <Stack
      style={{ margin: "16px 16px 0 16px" }}
      horizontal
      tokens={{ childrenGap: 16 }}
    >
      <Stack.Item
        grow
        styles={{
          root: { width: "50%", background: "white", minHeight: "500px" },
        }}
        style={cardStyle}
      >
        <Stack horizontalAlign="start">
          <Text variant="xLarge">Partner Type</Text>
        </Stack>
        <Separator />
        <Stack horizontalAlign="start" style={{ margin: "16px 0px" }}>
          <Text style={{ color: "grey" }} variant="smallPlus">
            Please Select the Partner Type and Subtype
          </Text>
        </Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 8 }}
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
        >
          <Label style={{ textAlign: "left", minWidth: "8vw" }}>
            Partner Type*
          </Label>
          <ComboBox
            placeholder="Please select"
            selectedKey={selectedPartnerType}
            options={PartnerTypeOptions}
            onChange={changePartnerSubTypeOptions}
            style={{ width: "20vw" }}
          />
        </Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 8 }}
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
        >
          <Label style={{ textAlign: "left", minWidth: "8vw" }}>
            Partner Subtype*
          </Label>
          <ComboBox
            placeholder="Please select"
            options={subTypeOptions}
            selectedKey={selectedPartnerSubType}
            onChange={(
              event: React.FormEvent<IComboBox>,
              item?: IComboBoxOption
            ) => {
              setSelectedPartnerSubType(item?.key);
              updateFormData({ partnerSubType: item });
            }}
            style={{ width: "20vw" }}
            disabled={subTypeOptions.length === 0}
          />
        </Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 8 }}
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
        >
          <Label
            style={{ textAlign: "left", minWidth: "8vw" }}
            htmlFor={textFieldSubtype2}
          >
            Partner Subtype2*
          </Label>
          <Stack.Item>
            <TextField
              style={{ width: "20vw" }}
              id={textFieldSubtype2}
              value={partnerSubType2?.text}
              onChange={(_event, newValue) => {
                setPartnerSubType2({ text: newValue })
                updateFormData({ partnerSubType2: { text: newValue } });
                }
              }
            />
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item
        grow
        styles={{ root: { width: "50%", background: "white" } }}
        style={cardStyle}
      >
        <Stack horizontalAlign="start">
          <Text variant="xLarge">Tenant, Geozone, Location</Text>
        </Stack>
        <Separator />
        <Stack horizontalAlign="start" style={{ margin: "16px 0px" }}>
          <Text style={{ color: "grey" }} variant="smallPlus">
            Tenants and Geozones may be locked for a specific combination.
          </Text>
        </Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 8 }}
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
        >
          <Label style={{ textAlign: "left", minWidth: "8vw" }}>Tenant</Label>
          <ComboBox
            placeholder="Please select"
            options={tenantOptions}
            style={{ width: "20vw" }}
            buttonIconProps={{ iconName: "lock" }}
            disabled
          />
        </Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 8 }}
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
        >
          <Label style={{ textAlign: "left", minWidth: "8vw" }}>Geozone</Label>
          <ComboBox
            placeholder="Please select"
            options={geozoneOptions}
            disabled
            style={{ width: "20vw" }}
            buttonIconProps={{ iconName: "lock" }}
          />
        </Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 8 }}
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
        >
          <Label style={{ textAlign: "left", minWidth: "8vw" }}>
            Location*
          </Label>
          <ComboBox
            placeholder="Please select"
            options={locationOptions}
            style={{ width: "20vw" }}
          />
        </Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 8 }}
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
        >
          <Label style={{ textAlign: "left", minWidth: "8vw" }}>
            Location Unit*
          </Label>
          <ComboBox
            placeholder="Please select"
            options={locationUnitOptions}
            style={{ width: "20vw" }}
          />
        </Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 8 }}
          verticalAlign="center"
          style={{ marginBottom: "16px" }}
        >
          <Label style={{ textAlign: "left", minWidth: "8vw" }}>Owner</Label>
          <ComboBox
            placeholder="Please select"
            options={ownerOptions}
            style={{ width: "20vw" }}
            disabled
            buttonIconProps={{ iconName: "lock" }}
          />
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

export default PartnerTypeStep;
