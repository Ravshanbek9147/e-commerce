import React, { useEffect, useState } from "react";
import { Select, MenuItem, Button, Grid, Typography, InputLabel } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import FormInput from "./InputField";

//JSX
const AddressForm = ({ checkoutToken, next }) => {
  ///States
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
  const options = shippingOptions.map((so) => ({
    id: so.id,
    label: `${so.description} - (${so.price.formatted_with_symbol})`,
  }));

  //ASYNC
  const fetchShippingCountries = async (signal) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutToken.id, { signal: signal });

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchShippingSubdivisions = async (countryCode, signal) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode, { signal: signal });
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, region, signal) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region },
      { signal: signal }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      fetchShippingCountries(signal);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("fetch aborted");
      } else {
        console.log(error);
      }
    }

    return () => abortController.abort();
  }, [checkoutToken]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      if (shippingCountry) fetchShippingSubdivisions(shippingCountry, signal);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("fetch aborted");
      } else {
        console.log(error);
      }
    }
    return () => abortController.abort();
  }, [shippingCountry]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision, signal);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("fetch aborted");
      } else {
        console.log(error);
      }
    }
    return () => abortController.abort();
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({ ...data, shippingCountry, shippingSubdivision, shippingOption })
          )}
          // onSubmit={methods.handleSubmit((data) =>
          //   next({ ...data, shippingCountry, shippingSubdivision, shippingOption })
          // )}
        >
          <Grid container spacing={3}>
            <FormInput name="firstname" label="FirstName" />
            <FormInput name="lastname" label="LastName" />
            <FormInput name="email" label="Email" />
            <FormInput name="address1" label="Address" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="Zip/Postal Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
