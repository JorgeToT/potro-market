export default function Card({ props }) {
  return (
    <a href="" className="m-5 w-56 h-1/3 inline-block">
      <div className="p-8 flex flex-col justify-between items-center bg-white text-black text-lg font-semibold h-full">
        <h2 className="my-3 text-base text-center font-semibold">{props.title}</h2>
        <p className="my-3 text-base">${props.price}</p>
      </div>
    </a>
  );
}
