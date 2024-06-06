import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSecton";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  PricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  return (
    <FormProvider {...formMethods}>
      
      <form>
        <DetailsSection />
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
