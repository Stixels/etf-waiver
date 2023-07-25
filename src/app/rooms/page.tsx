// pages/waiver.tsx
import axios from "axios";

const WaiverPage = async (props: WaiverPageProps) => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");

  //   const startTime = `${year}-${month}-${date}T${
  //     now.toISOString().split("T")[1]
  //   }`;
  //   const endTime = `${year}-${month}-${date}T23:59:59-05:00`;

  // start and end time for testing:
  const startTime = `2023-05-27T01:00:00-05:00`;
  const endTime = `2023-05-27T23:59:59-05:00`;

  const url = `https://api.bookeo.com/v2/bookings?secretKey=${process.env.BOOKEO_SECRET_KEY}&apiKey=${process.env.BOOKEO_API_KEY}&startTime=${startTime}&endTime=${endTime}`;

  const response = await axios.get(url);
  const data = response.data;
  console.log(data);

  return (
    <div>
      <h1>Waiver Page</h1>
      {data.totalItems === 0 ? (
        <p>No bookings found</p>
      ) : (
        data.data.map((group: Group) => (
          <div key={group.id}>
            <p>{group.productName}</p>
            <h2>{group.startTime}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default WaiverPage;

interface Group {
  id: string;
  startTime: string;
  productName: string;
}

interface WaiverPageProps {
  groups: Group[];
}
