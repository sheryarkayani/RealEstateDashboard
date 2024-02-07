import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { AiFillInfoCircle } from "react-icons/ai";
import { Alert, Button } from "flowbite-react";
import { BiError } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { useStateContext } from "../../context";

function Explore() {
  const { isMobile } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [sheetData, setSheetData] = useState({
    columns: [],
    values: [],
  });
  const [filteredData, setFilteredData] = useState([]);
  const [ProjectFilter, setProjectFilter] = useState(null);
  const [FloorFilter, setFloorFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    Projects: [],
    Floors: [],
    types: [],
  });

  const fetchSheet = async () => {
    const GOOGLE_SHEETS_API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
    const GOOGLE_SHEETS_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}?key=${GOOGLE_SHEETS_API_KEY}`
      );
      const sheets = await response.json();

      const range = `${sheets?.sheets[0]?.properties?.title}`;

      const sheet = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${range}?key=${GOOGLE_SHEETS_API_KEY}`
      );
      const sheetData = await sheet.json();

      const columns = sheetData?.values[0];
      const values = sheetData?.values?.slice(1);

      const allFilterOptions = {
        Projects: [],
        Floors: [],
        types: [],
      };

      values?.forEach((row) => {
        const ProjectIndex = columns.indexOf("Project");
        const FloorIndex = columns.indexOf("Floor");
        const typeIndex = columns.indexOf("Type");
        row[ProjectIndex] && allFilterOptions["Projects"].push(row[ProjectIndex]);
        row[FloorIndex] && allFilterOptions["Floors"].push(row[FloorIndex]);
        row[typeIndex] && allFilterOptions["types"].push(row[typeIndex]);
      });

      allFilterOptions["Projects"] = [...new Set(allFilterOptions["Projects"])];
      allFilterOptions["Floors"] = [...new Set(allFilterOptions["Floors"])];
      allFilterOptions["types"] = [...new Set(allFilterOptions["types"])];
      setFilterOptions(allFilterOptions);

      setSheetData({
        columns,
        values,
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSheet();
  }, []);

  const handleFind = () => {
    let allValues = sheetData?.values;
    if (ProjectFilter) {
      const ProjectIndex = sheetData?.columns?.indexOf("Project");
      allValues = allValues?.filter((row) => row[ProjectIndex] === ProjectFilter);
    }

    if (FloorFilter) {
      const ProjectIndex = sheetData?.columns?.indexOf("Floor");
      allValues = allValues?.filter((row) => row[ProjectIndex] === FloorFilter);
    }

    if (typeFilter) {
      const ProjectIndex = sheetData?.columns?.indexOf("Type");
      allValues = allValues?.filter((row) => row[ProjectIndex] === typeFilter);
    }

    if (!allValues?.length) {
      setNoDataFound(true);
    } else {
      setNoDataFound(false);
    }

    if (ProjectFilter || typeFilter || FloorFilter) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      setFilteredData(allValues);
    } else {
      setFilteredData([]);
    }
  };
  return (
    <>
      <div className="flex justify-between items-end mb-4">
        <div
          className={`flex items-end ${
            isMobile ? "flex-col w-full" : ""
          } space-x-2`}
        >
          <div className={isMobile ? "w-full mb-2" : ""}>
            <label
              htmlFor="Projects"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Project
            </label>

            {ProjectFilter ? (
              <div
                className={`bg-[#eeeeee] dark:bg-[#16131e] dark:text-white ${
                  isMobile ? "w-full justify-between" : ""
                } flex items-stretch text-black rounded-xl`}
              >
                <p className="px-8 py-2">{ProjectFilter}</p>
                <div
                  onClick={() => setProjectFilter(null)}
                  className=" bg-gray-300 rounded-tr-xl rounded-br-xl px-2 flex justify-center cursor-pointer items-center"
                >
                  <GrFormClose />
                </div>
              </div>
            ) : (
              <select
                id="Projects"
                disabled={isLoading}
                value={ProjectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="bg-gray-50 border dark:bg-[#20193a] dark:text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected value={null}>
                  Choose the Project
                </option>

                {filterOptions?.Projects?.map((Project) => {
                  return (
                    <option key={Project} value={Project}>
                      {Project}
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          <div className={isMobile ? "w-full mb-2" : ""}>
            <label
              htmlFor="Floors"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Floor
            </label>
            {FloorFilter ? (
              <div
                className={`bg-[#eeeeee] dark:bg-[#16131e] dark:text-white ${
                  isMobile ? "w-full justify-between" : ""
                } flex items-stretch text-black rounded-xl`}
              >
                <p className="px-8 py-2">{FloorFilter}</p>
                <div
                  onClick={() => setFloorFilter(null)}
                  className=" bg-gray-300 px-2 rounded-tr-xl rounded-br-xl flex justify-center cursor-pointer items-center"
                >
                  <GrFormClose />
                </div>
              </div>
            ) : (
              <select
                value={FloorFilter}
                disabled={isLoading}
                onChange={(e) => setFloorFilter(e.target.value)}
                id="Floors"
                className="bg-gray-50 dark:bg-[#20193a] dark:text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected value={null}>
                  Choose the Floor
                </option>

                {filterOptions?.Floors?.map((Floor) => {
                  return (
                    <option key={Floor} value={Floor}>
                      {Floor}
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          <div className={isMobile ? "w-full mb-3" : ""}>
            <label
              htmlFor="types"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            {typeFilter ? (
              <div
                className={`bg-[#eeeeee] dark:bg-[#16131e] dark:text-white ${
                  isMobile ? "w-full justify-between" : ""
                } flex items-stretch text-black rounded-xl`}
              >
                <p className="px-8 py-2">{typeFilter}</p>
                <div
                  onClick={() => setTypeFilter(null)}
                  className=" bg-gray-300 px-2 flex rounded-tr-xl rounded-br-xl justify-center cursor-pointer items-center"
                >
                  <GrFormClose />
                </div>
              </div>
            ) : (
              <select
                value={typeFilter}
                disabled={isLoading}
                onChange={(e) => setTypeFilter(e.target.value)}
                id="types"
                className="bg-gray-50 dark:bg-[#20193a] dark:text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected value={null}>
                  Choose the type
                </option>

                {filterOptions?.types?.map((type) => {
                  return (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <Button
            className={isMobile ? "w-full" : ""}
            onClick={handleFind}
            color="purple"
            disabled={isLoading}
          >
            Find!
          </Button>
        </div>
        {/* {filteredData?.length ? (
              <div className="relative">
                <label htmlFor="hs-table-search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  name="hs-table-search"
                  id="hs-table-search"
                  className="block w-full border p-2.5 pl-10 text-sm border-gray-300 rounded-md"
                  placeholder="Search..."
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg
                    className="h-3.5 w-3.5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </div>
            ) : (
              <></>
            )} */}
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        [
          filteredData?.length ? (
            <div
              className={`w-full inline-block align-middle ${
                isMobile && "mt-4"
              }`}
            >
              <div className="overflow-x-scroll border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
                  <thead className="bg-purple-600">
                    <tr>
                      <th scope="col" className="py-1.5 pl-4">
                        <div className="flex items-center h-5">
                          <input
                            id="checkbox-all"
                            type="checkbox"
                            className="text-black border-gray-200 rounded focus:ring-purple-500"
                          />
                          <label htmlFor="checkbox" className="sr-only">
                            Checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-1.5 text-xs font-bold text-center text-white uppercase "
                      >
                        ID
                      </th>
                      {sheetData?.columns?.map((col) => {
                        return (
                          <th
                            key={col}
                            scope="col"
                            className="py-1.5 px-6 text-xs font-bold text-left text-white uppercase "
                          >
                            {col}
                          </th>
                        );
                      })}
                      <th
                        scope="col"
                        className="py-1.5 text-xs font-bold text-white uppercase "
                      >
                        Edit
                      </th>
                      <th
                        scope="col"
                        className="py-1.5 text-xs font-bold text-white uppercase "
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData?.map((row, rowIndex) => {
                      return (
                        <tr key={rowIndex}>
                          <td className="py-3 pl-4">
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                className="text-purple-600 placeholder:border-gray-200 rounded focus:ring-purple-500"
                              />
                              <label htmlFor="checkbox" className="sr-only">
                                Checkbox
                              </label>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white whitespace-nowrap">
                            {rowIndex + 1}
                          </td>
                          {sheetData?.columns?.map((col, index) => {
                            return (
                              <td
                                key={index}
                                className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white whitespace-nowrap"
                              >
                                {filteredData[rowIndex][index] || "-"}
                              </td>
                            );
                          })}
                          <td className="px-3 py-4 text-sm font-medium text-left whitespace-nowrap">
                            <a
                              className="text-green-500 hover:text-green-700"
                              href="/"
                            >
                              Edit
                            </a>
                          </td>
                          <td className="px-3 py-4 text-sm font-medium text-left whitespace-nowrap">
                            <a
                              className="text-red-500 hover:text-red-700"
                              href="/"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              {noDataFound ? (
                <Alert color="failure" icon={BiError}>
                  <span>
                    <p>No data found!</p>
                  </span>
                </Alert>
              ) : (
                <Alert color="info" icon={AiFillInfoCircle}>
                  <span>
                    <p>Select filters and hit 'Find' button!</p>
                  </span>
                </Alert>
              )}
            </>
          ),
        ]
      )}
    </>
  );
}

export default Explore;
