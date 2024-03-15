'use client';

const CertificateType = () => {
  return (
    <label>
      <h3>Certificate Type</h3>
      <select className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'>
        <option value='Certificate'>Certificate</option>
        <option value='Quality'>Quality</option>
      </select>
    </label>
  );
};

export default CertificateType;
