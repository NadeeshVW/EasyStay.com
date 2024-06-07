import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSecton";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

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
    const { handleSubmit } =formMethods;

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        //create new formdata object & call our API
        const formData = new FormData();
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("desciption", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("PricePerNight", formDataJson.PricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index)=>{
            formData.append(`facilities[${index}]`, facility)
        })

        Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`, imageFile)
        })
    })


  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Save
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
