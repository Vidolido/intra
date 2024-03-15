'use client';

const Product = () => {
  return (
    <label>
      <h3>Product</h3>
      <select className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'>
        <option value='UNL-95'>UNL-95</option>
        <option value='UNL-98'>UNL-98</option>
        <option value='ULSD'>ULSD</option>
        <option value='JET-A1'>JET-A1</option>
        <option value='FUEL OIL'>FUEL OIL</option>
        <option value='H.G.O.'>H.G.O.</option>
        <option value='L.P.G.'>L.P.G.</option>
      </select>
    </label>
  );
};

export default Product;
