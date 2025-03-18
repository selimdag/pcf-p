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
import { IInputs } from "../generated/ManifestTypes";
import mockLegalEntityTypes from "../mockData/legalEntityTypes.json";
import mockCommunicationLanguages from "../mockData/hg_hdilanguages.json";
import mockCountries from "../mockData/hg_countries.json";
import mockProvinces from "../mockData/hg_provinces.json";

const cardStyle: React.CSSProperties = {
  padding: 16,
  border: "1px solid #E1DFDD",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  borderRadius: 4,
};

export interface IEntity {
  [key: string]: string;
}
type oData = {  value:  IEntity [] } ;




export const fetchData = async (context: ComponentFramework.Context<IInputs>, query: string, mockData: oData): Promise<IEntity[]> => {
  let data;
  if (process.env.NODE_ENV === "development") {
    data = mockData.value;
  } else {
    const response = await context.webAPI.retrieveMultipleRecords(query);
    data = response.entities;
  }
  return data;
};


 const addressTypeOptions: IComboBoxOption[] = [
    { key: '0', text: 'Street adress' },
    { key: '1', text: 'Post office box' },
    { key: '2', text: 'Large corporate' },
 ];

interface INameAdressStepProps {
  context: ComponentFramework.Context<IInputs>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateFormData : (newField: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData:  {[key: string]: any};
}

const NameAdressStep = ({ context, updateFormData, formData }: INameAdressStepProps): JSX.Element => {
  const [legalEntityOptions, setLegalEntityOptions] = React.useState<
    IComboBoxOption[]
  >([]);
  const [communicationLanguageOptions, setCommunicationLanguageOptions] = React.useState<
    IComboBoxOption[]
  >([]);
  const [countryOptions, setCountryOptions] = React.useState<IComboBoxOption[]>([]);
  const [countryData, setCountryData] = React.useState<IEntity[]>([]);
  const [provinceOptions, setProvinceOptions] = React.useState<IComboBoxOption[]>([]);
  const [selectedLanguageKey, setSelectedLanguageKey] = React.useState<string | undefined>(undefined);
  const [selectedCountryKey, setSelectedCountryKey] = React.useState(formData.country?.key);

  const [partnerName, setPartnerName] = React.useState<string | undefined>(formData.partnerName?.text);
  const [dunsNumber, setDunsNumber] = React.useState<string | undefined>(formData.dunsNumber?.text);
  const [talanxGroupId, setTalanxGroupId] = React.useState<string | undefined>(formData.talanxGroupId?.text);
  const [additionalInfo, setAdditionalInfo] = React.useState<string | undefined>(formData.additionalInfo?.text);
  const [legalEntityType, setLegalEntityType] = React.useState(formData.legalEntityType?.key);
  const [addressType, setAddressType] = React.useState(formData.addressType?.key);
  const [street, setStreet] = React.useState<string | undefined>(formData.street?.text);
  const [zipCode, setZipCode] = React.useState<string | undefined>(formData.zipCode?.text);
  const [city, setCity] = React.useState<string | undefined>(formData.city?.text);
  const [state, setState] = React.useState(formData.state?.key);
  const [addressInfo1, setAddressInfo1] = React.useState<string | undefined>(formData.addressInfo1?.text);
  const [addressBlock, setAddressBlock] = React.useState<string | undefined>(formData.addressBlock?.text);
 
  const fetchCountries = async () => {
    const query = `?$select=hg_country_name_str,hg_iso3_code_str,hg_iso2_code_str&$filter=statuscode eq 1`;
    const data = await fetchData(context, query, mockCountries);
    setCountryData(data);
    setCountryOptions(
      data.map((language) => ({
        key: language.hg_iso3_code_str,
        text: language.hg_country_name_str,
      }))
    );
    console.log("countryData123", data);
    return data;
  };

  React.useEffect(() => {
    const fetchLegalEntityTypes = async () => {
      const query = `?$select=hg_name,hg_external_key_str&$filter=hg_external_data_origin eq '140230001'`;
      const data = await fetchData(context, query, mockLegalEntityTypes);
      setLegalEntityOptions(
        data.map((entity) => ({
          key: entity.hg_external_key_str,
          text: entity.hg_name,
        }))
      );
    };
    const fetchCommunicationLanguages = async () => {
      const query = `?$select=hg_name,hg_iso_alpha_3_str&$filter=statuscode eq 1`;
      const data = await fetchData(context, query, mockCommunicationLanguages);
      setCommunicationLanguageOptions(
        data.map((language) => ({
          key: language.hg_iso_alpha_3_str,
          text: language.hg_name,
        }))
      );
      setSelectedLanguageKey(formData?.communicationLanguage?.key || "ENG");
    };
   
    
    fetchLegalEntityTypes();
    fetchCommunicationLanguages();
    fetchCountries();
  }, []);

  React.useEffect(() => {
    (async () => {
    const countries = countryData.length === 0 ? await fetchCountries() :  countryData;
    const iso2_code = countries.find((country) => country.hg_iso3_code_str === selectedCountryKey)?.hg_iso2_code_str;
    if(!iso2_code ) return;
    const fetchProvinces = async () => {
      const query = `?$select=hg_name,hg_subvision_code_str&$filter=statuscode eq 1 and contains(hg_subvision_code_str, '${selectedCountryKey}')`;
      const data = await fetchData(context, query, mockProvinces );
      setProvinceOptions(
        data.filter((province) => {
          if (process.env.NODE_ENV === "development") {
            return province.hg_subvision_code_str.startsWith(iso2_code);
          }
          return true;
        }).map((province) => ({
          key: province.hg_subvision_code_str,
          text: province.hg_name,
        }))
      );
    };
    fetchProvinces();
  })()
  }, [selectedCountryKey]);


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
          <Text variant="xLarge">Partner Name</Text>
        </Stack>
        <Separator />
        <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>Name*</label>
          </Stack.Item>
          <Stack.Item grow>
            <TextField
              placeholder="Use * for wildcard search"
              value={partnerName}
              styles={{ fieldGroup: { width: "80%" } }}
              onChange={(_event, newValue) => {
                setPartnerName(newValue); 
                updateFormData({ partnerName: {text: newValue}});
              }}
            />
          </Stack.Item>
        </Stack>

        <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>DUNS No.</label>
          </Stack.Item>
          <Stack.Item grow>
            <TextField
              placeholder="Please enter 9 digits DUNS number"
              value={dunsNumber}
              onChange={(_event, newValue) => {
                setDunsNumber(newValue); 
                updateFormData({ dunsNumber: {text: newValue}});
              }
              }
              styles={{ fieldGroup: { width: "80%" } }}
            />
          </Stack.Item>
        </Stack>

        <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
              Legal Enity Type
            </label>
          </Stack.Item>
          <Stack.Item grow>
                <ComboBox
                  placeholder="Please select"
                  selectedKey={legalEntityType}
                  onChange={(event, option) => {
                    setLegalEntityType(option?.key);
                    updateFormData({ legalEntityType: option});
                  }}
                  options={ legalEntityOptions}
                  style={{width: "80%"}}
                />
          </Stack.Item>
        </Stack>

        <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
              Communication Language
            </label>
          </Stack.Item>
          <Stack.Item grow>
                <ComboBox
                  placeholder="Please select"
                  options={ communicationLanguageOptions }
                  selectedKey={selectedLanguageKey}
                  onChange={(event, option) => {
                    updateFormData({ communicationLanguage: option});
                    setSelectedLanguageKey(option?.key as string)}}
                  style={{width: "80%"}}
                />
          </Stack.Item>
        </Stack>

        <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
              Talanx Group ID
            </label>
          </Stack.Item>
          <Stack.Item grow>
            <TextField styles={{ fieldGroup: { width: "80%" } }}
            value={talanxGroupId}
            onChange={
              (_event, newValue) => {
                setTalanxGroupId(newValue); 
                updateFormData({ talanxGroupId: {text: newValue}});
              }
            } />
          </Stack.Item>
        </Stack>

        <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
              Additional Information
            </label>
          </Stack.Item>
          <Stack.Item grow>
            <TextField styles={{ fieldGroup: { width: "80%" } }} 
            value={additionalInfo}
            onChange={
              (_event, newValue) => {
                setAdditionalInfo(newValue); 
                updateFormData({ additionalInfo: {text: newValue}});
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
          <Text variant="xLarge">Partner Address</Text>
        </Stack>
        <Separator />

         <Stack
          horizontal
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
              Adress Type*
            </label>
          </Stack.Item>
          <Stack.Item grow>
                <ComboBox
                  placeholder="Please select"
                  selectedKey={addressType}
                  onChange={(event, option) => {
                    setAddressType(option?.key);
                    updateFormData({ addressType: option});
                  }}
                  options={ addressTypeOptions}
                  style={{width: "80%"}}
                />
          </Stack.Item>
        </Stack>

          <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
              Street*
            </label>
          </Stack.Item>
          <Stack.Item grow>
            <TextField 
            placeholder="Street name + Number" 
            styles={{ fieldGroup: { width: "80%" } }} 
            value={street}
            onChange={
              (_event, newValue) => {
                setStreet(newValue); 
                updateFormData({ street: {text: newValue}});
              }
            }
            />
          </Stack.Item>
        </Stack>

        <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
             ZIP / Post Code* 
            </label>
          </Stack.Item>
          <Stack.Item grow>
            <TextField 
              placeholder="ZIP" 
              styles={{ fieldGroup: { width: "80%" } }} 
              value={zipCode}
              onChange={
                (_event, newValue) => {
                  setZipCode(newValue); 
                  updateFormData({ zipCode: {text: newValue}});
                }
              }
              />
          </Stack.Item>
        </Stack>
      
        <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
              City*
            </label>
          </Stack.Item>
          <Stack.Item grow>
            <TextField 
              placeholder="City" 
              styles={{ fieldGroup: { width: "80%" } }}
              value={city}
              onChange={
                (_event, newValue) => {
                  setCity(newValue); 
                  updateFormData({ city: {text: newValue}});
                }
              }
              />  
          </Stack.Item>
        </Stack>

        <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
             Country* 
            </label>
          </Stack.Item>
          <Stack.Item grow>
                <ComboBox
                  placeholder="Please select"
                  options={ countryOptions }
                  selectedKey={selectedCountryKey}
                  onChange={(event, option) => {
                    updateFormData({ country: option});
                    setSelectedCountryKey(option?.key as string)}
                  }
                  style={{width: "80%"}}
                />
          </Stack.Item>
        </Stack>

        <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
             State / County* 
            </label>
          </Stack.Item>
          <Stack.Item grow>
                <ComboBox
                  placeholder="Please select"
                  selectedKey={state}
                  onChange={(event, option) => {
                    setState(option?.key);
                    updateFormData({ state: option});
                  }}

                  options={ provinceOptions }
                  style={{width: "80%"}}
                />
          </Stack.Item>
        </Stack>

        <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
              Address Info 1
            </label>
          </Stack.Item>
          <Stack.Item grow>
            <TextField 
            styles={{ fieldGroup: { width: "80%" } }} 
            value={addressInfo1}
            onChange={
              (_event, newValue) => {
                setAddressInfo1(newValue); 
                updateFormData({ addressInfo1: {text: newValue}});
              }
            }
            />
          </Stack.Item>
        </Stack>
        
        <Stack
          horizontal
          style={{ marginTop: "22px" }}
          tokens={{ childrenGap: 16 }}
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: 180, textAlign: "left" } }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>
              Address Block
            </label>
          </Stack.Item>
          <Stack.Item grow>
            <TextField 
            multiline 
            styles={{ fieldGroup: { width: "80%" } }}
            value={addressBlock}
            onChange={
              (_event, newValue) => {
                setAddressBlock(newValue); 
                updateFormData({ addressBlock: {text: newValue}});
              }
            }
            />
          </Stack.Item>
        </Stack>

      </Stack.Item>
    </Stack>
  );
};

export default NameAdressStep;
