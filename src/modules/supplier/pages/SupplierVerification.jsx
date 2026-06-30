import {
  Box,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Stack,
  Divider,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= API ================= */

const API_BASE = "http://localhost:8080/api";

const getToken = () => localStorage.getItem("token");

const submitSupplierVerification = async (supplierId, payload) => {
  const res = await fetch(
    `${API_BASE}/supplier/verification/submit?supplierId=${supplierId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    }
  );

  return res.json();
};

const uploadDocument = async (supplierId, type, file) => {
  const formData = new FormData();
  formData.append("supplierId", supplierId);
  formData.append("type", type);
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/supplier/documents/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  return res.json();
};

/* ================= COMPONENT ================= */

const steps = ["Business Info", "Documents", "Review & Submit"];

const SupplierVerification = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const supplierId = localStorage.getItem("uniqueUserId"); 

  /* EMPTY INITIAL FORM */
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    mobile: "",
    email: "",
    address: "",
    gst: "",
    pan: "",
  });

  /* FILES */
  const [files, setFiles] = useState({
    BUSINESS_LICENSE: null,
    GST_CERTIFICATE: null,
    ID_PROOF: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (type, e) => {
    setFiles({ ...files, [type]: e.target.files[0] });
  };

  /* UPLOAD DOCUMENTS */
  const handleUploadDocuments = async () => {
    try {
      const uploads = Object.entries(files).map(([type, file]) => {
        if (!file) return null;
        return uploadDocument(supplierId, type, file);
      });

      await Promise.all(uploads.filter(Boolean));
      return true;
    } catch (err) {
      console.error("Upload error:", err);
      return false;
    }
  };

  /* FINAL SUBMIT */
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // 1. Upload documents
      const uploaded = await handleUploadDocuments();
      if (!uploaded) {
        alert("Document upload failed");
        return;
      }

      // 2. Submit verification
      const payload = {
        businessName: form.businessName,
        ownerName: form.ownerName,
        mobileNumber: form.mobile,
        email: form.email,
        businessAddress: form.address,
        gstNumber: form.gst,
        panNumber: form.pan,
      };

      const res = await submitSupplierVerification(supplierId, payload);

      if (res?.success) {
        alert("Verification submitted successfully!");
        setActiveStep(0);

        // reset form
        setForm({
          businessName: "",
          ownerName: "",
          mobile: "",
          email: "",
          address: "",
          gst: "",
          pan: "",
        });

        setFiles({
          BUSINESS_LICENSE: null,
          GST_CERTIFICATE: null,
          ID_PROOF: null,
        });

        if (res?.success) {
          navigate("/supplier/verification-status");
        }
      } else {
        alert(res?.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F4F6F8", py: 5 }}>
      <Container maxWidth="md">
        {/* HEADER */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={700}>
            Supplier Verification
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            Complete all required steps to verify your business account
          </Typography>
        </Box>

        {/* STEPPER */}
        <Paper sx={{ p: 2.5, mb: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* MAIN CARD */}
        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Box sx={{ p: 4 }}>
            {/* STEP 1 */}
            {activeStep === 0 && (
              <Stack spacing={3}>
                <Typography variant="h6">Business Information</Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Business Name"
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Owner Name"
                      name="ownerName"
                      value={form.ownerName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="GST Number"
                      name="gst"
                      value={form.gst}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="PAN Number"
                      name="pan"
                      value={form.pan}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Stack>
            )}

            {/* STEP 2 */}
            {activeStep === 1 && (
              <Stack spacing={2}>
                <Typography variant="h6">Upload Documents</Typography>

                {[
                  { label: "Business License", type: "BUSINESS_LICENSE" },
                  { label: "GST Certificate", type: "GST_CERTIFICATE" },
                  { label: "Government ID Proof", type: "ID_PROOF" },
                ].map((doc) => (
                  <Paper
                    key={doc.type}
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography fontWeight={500}>{doc.label}</Typography>

                      {/* ✅ FILE NAME DISPLAY */}
                      <Typography variant="caption" color="text.secondary">
                        {files[doc.type]?.name ? (
                          <>Selected: {files[doc.type].name}</>
                        ) : (
                          "No file selected"
                        )}
                      </Typography>
                    </Box>

                    <Button variant="outlined" component="label">
                      {files[doc.type] ? "Change" : "Upload"}

                      <input
                        hidden
                        type="file"
                        onChange={(e) => handleFileChange(doc.type, e)}
                      />
                    </Button>
                  </Paper>
                ))}
              </Stack>
            )}

            {/* STEP 3 */}
            {activeStep === 2 && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Review Details
                  </Typography>

                  <Stack spacing={1}>
                    <Typography>
                      <b>Business:</b> {form.businessName}
                    </Typography>
                    <Typography>
                      <b>Owner:</b> {form.ownerName}
                    </Typography>
                    <Typography>
                      <b>Mobile:</b> {form.mobile}
                    </Typography>
                    <Typography>
                      <b>Email:</b> {form.email}
                    </Typography>
                    <Typography>
                      <b>GST:</b> {form.gst}
                    </Typography>
                    <Typography>
                      <b>PAN:</b> {form.pan}
                    </Typography>
                    <Typography>
                      <b>Address:</b> {form.address}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Box>

          <Divider />

          {/* FOOTER */}
          <Box
            sx={{
              p: 2.5,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((p) => p - 1)}
              variant="outlined"
              fullWidth
            >
              Back
            </Button>

            {activeStep < 2 ? (
              <Button
                variant="contained"
                onClick={() => setActiveStep((p) => p + 1)}
                fullWidth
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                disabled={loading}
                fullWidth
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SupplierVerification;