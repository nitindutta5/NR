import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Restaurant.module.css";
import { CLOUDINARY_URL } from "../../utils/constants";
import Shimmer from "../Common/Shimmer";

const RestaurantDetail = () => {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState({});
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/v4/full?lat=28.677106134761935&lng=77.48572502285242&menuId=${id}`
    );
    const res = await data.json();
    setData(res?.data);
    setMenu([...Object.values(res?.data?.menu?.items)]);
  };
  const history = useNavigate();
  return (
    <div className="container">
      <button className="btn p-1" onClick={() => history(-1)}>
        {" "}
        {`<`} Back
      </button>
      <div className={styles.restaurantDetail}>
        {JSON.stringify(data) === "{}" ? (
          <Shimmer size={1} />
        ) : (
          <>
            <h1 className="text-xl mb-2">{data?.name}</h1>
            <div className={styles.info}>
              <div>
              <img
                className="img-res"
                src={CLOUDINARY_URL + `${data?.cloudinaryImageId}`}
              />
              <div className="pt-3">
                <p>
                  Address :{" "}
                  <span>
                    {data?.locality}
                  </span>
                </p>
                <p>
                  Cost: <span>{data?.costForTwoMsg}</span>
                </p>
                <p>
                  Cuisine: <span>{data?.cuisines?.join(", ")}</span>
                </p>
                <p></p>
              </div>
              </div>
              <div className={styles.right}>
            <div className={styles.menu}>
              <p className="text-xl">Menu</p>
              <ul>
                {menu.length ===0 && <p>Menu not available</p> }
                  {menu?.map((item) => (
                  <li key={item.id}>
                    <div  className="p-2 pl-0 border-1 d-flex justify-content-between algin-items-center">
                    <p className="m-0 p-0">{item.name} - Rs.<b>{Math.round(item.price / 100)}</b></p>
                    <button className="btn p-2">Add</button>
                    </div>

                  </li>
                ))}
              </ul>
            </div>
            </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
