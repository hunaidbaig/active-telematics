import React from "react";

function RecognitionTable() {
  return (
            <div class='table-responsive p-0'>
              <table class='table align-items-center mb-0'>
                <thead>
                  <tr>
                    <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                      Time
                    </th>
                    <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                      Image
                    </th>
                    <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class='text-xs font-weight-bold mb-0 text-secondary'>
                      time
                    </td>
                    <td class='text-xs font-weight-bold mb-0 text-secondary'>
                      image
                    </td>
                    <td class='text-xs font-weight-bold mb-0 text-secondary'>
                      location
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  );
}

export default RecognitionTable;
