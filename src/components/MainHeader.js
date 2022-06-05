import SaveIcon from "@mui/icons-material/Save";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearCheckedData,
  clearCheckedSavedData,
  setDeleted,
  setSaved,
} from "../reducers/email";
import Paginate from "./Paginate";

function MainHeader() {
  const dispatch = useDispatch();
  const emailData = useSelector((state) => state.email.value);
  const checkedData = emailData.checkedData;
  const checkedSaveData = emailData.checkedSaveData;

  const handleClickSave = (e) => {
    toast.dismiss();

    if (!checkedData.length) {
      toast.error("No unread item selected!");
      return;
    }
    // set button disabled to avoid duplication of save
    e.target.disabled = true;

    dispatch(setSaved(checkedData));
    dispatch(clearCheckedData());
    toast.success("selected item is saved!");

    const inputCheckbox = document.querySelectorAll("input[type=checkbox]");
    inputCheckbox.forEach((element) => {
      element.checked = false;
    });

    // enable back save button
    e.target.disabled = false;
  };

  const handleClickDelete = (e) => {
    toast.dismiss();

    if (!checkedData.length && !checkedSaveData.length) {
      toast.error("No item selected!");
      return;
    }
    // set button disabled to avoid duplication of save
    e.target.disabled = true;

    dispatch(setDeleted({ unread: checkedData, saved: checkedSaveData }));
    dispatch(clearCheckedData());
    dispatch(clearCheckedSavedData());
    toast.success("selected item is deleted!");

    const inputCheckbox = document.querySelectorAll("input[type=checkbox]");
    inputCheckbox.forEach((element) => {
      element.checked = false;
    });

    // enable back save button
    e.target.disabled = false;
  };

  const handleOnChangeCheckbox = (e) => {
    const checkboxes = document.querySelectorAll(
      ".email-header input[type=checkbox]"
    );

    checkboxes.forEach((element) => {
      if (e.target.checked === element.checked) {
        element.click();
      }
      element.click();
    });
  };

  return (
    <div className="section-header border-b-2 border-gray-light pb-2">
      <div className="flex justify-between">
        <div className="space-x-4">
          <input
            type="checkbox"
            className="align-middle h-5 w-5"
            onChange={(e) => handleOnChangeCheckbox(e)}
          />
          <button
            type="button"
            onClick={(e) => handleClickSave(e)}
            className="uppercase bg-green-light hover:bg-green text-green hover:text-white px-1 border border-green hover:border-transparent rounded"
          >
            Save <SaveIcon fontSize="small" />
          </button>
          <button
            type="button"
            disabled={true}
            className="uppercase bg-gray-light border px-1 rounded disabled:opacity-75"
          >
            Manage Filters <FilterAltIcon fontSize="small" />
          </button>
          <button
            type="button"
            onClick={(e) => handleClickDelete(e)}
            className="uppercase bg-red-light hover:bg-red text-red hover:text-white px-1 border border-red hover:border-transparent rounded"
          >
            Delete <DeleteIcon fontSize="small" />
          </button>
        </div>
        <div className="text-gray">
          <Paginate />
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
