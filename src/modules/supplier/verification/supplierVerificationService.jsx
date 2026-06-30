const getSupplierVerificationStatus = async (supplierId, token) => {
  const res = await fetch(
    `http://localhost:8080/api/supplier/verification/status/${supplierId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch verification status");

  return res.json();
};

export default getSupplierVerificationStatus;