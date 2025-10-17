/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  ArrowLeft,
  Upload,
  X,
  CheckCircle,
  User,
  Phone,
  Mail,
  Calendar,
  Instagram,
  Building,
} from "lucide-react";
import { countryCodes, apiUri } from "../utility/constants";

interface CreatorRegistrationFormProps {
  onNavigate: (page: string) => void;
}

type CreatorRegistrationPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string; // "Male" | "Female" | "Other"
  isAbove18: boolean;
  instagramHandle: string;
  agency: string; // "Honeybees" | "Neha" | "Hubspoke" | "Others"
  images: string[]; // Array of 3 S3 object keys
  countryCode: string; // e.g. "+91"
  video: string; // S3 key for video
};

export default function CreatorRegistrationForm({
  onNavigate,
}: CreatorRegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    isAbove18: false,
    instagramHandle: "",
    agency: "",
    countryCode: "+91",
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [dragVideoActive, setDragVideoActive] = useState(false);

  const agencies = ["Honeybees", "Neha", "Hubspoke", "Others"];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const MAX_IMAGE_SIZE_MB = 5;
  const MAX_VIDEO_SIZE_MB = 50;

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files).slice(0, 3 - uploadedImages.length);
    const oversized = newImages.find(
      (file) => file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024
    );

    if (oversized) {
      alert("Each image must be less than 5 MB. Please choose a smaller file.");
      return;
    }

    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  // Handlers for video drag-and-drop
  const handleVideoDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragVideoActive(true);
    } else if (e.type === "dragleave") {
      setDragVideoActive(false);
    }
  };
  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragVideoActive(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;
    if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
      alert("Video must be less than 50MB.");
    } else if (!file.type.includes("mp4")) {
      alert("Only MP4 videos are allowed.");
    } else {
      setUploadedVideo(file);
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.phone.length === 10 &&
      formData.email.includes("@") &&
      formData.gender && // <-- Add gender validation
      formData.isAbove18 &&
      uploadedImages.length === 3 &&
      formData.agency &&
      formData.countryCode
      // uploadedVideo is now optional
    );
  };

  // Helper: Upload a single image to S3 using a presigned URL
  const uploadImageToS3 = async (file: File, presignedUrl: string) => {
    const res = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "image/*",
      },
    });
    if (!res.ok) throw new Error("Failed to upload image");
    return true;
  };

  // Helper: Upload a single video to S3 using fields object
  const uploadVideoToS3 = async (file: File, { url, fields }: any) => {
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("file", file);
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload video");
    return true;
  };

  // Helper: Get presigned URLs for image upload
  const getPresignedUrls = async (
    email: string,
    phone: string,
    includeVideo: boolean
  ) => {
    const res = await fetch(
      `${apiUri}/api/v1/creator_center/application/generate-url/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, include_video: includeVideo }),
      }
    );

    if (!res.ok) {
      // Try to extract error message from backend
      let errorMsg = "Failed to get presigned URLs";
      try {
        const errorData = await res.json();
        if (errorData?.message) {
          errorMsg = errorData.message;
        }
      } catch {
        // ignore JSON parse errors
      }
      // Handle "Creator applicant already exists." in UI
      if (errorMsg === "Creator applicant already exists.") {
        // Show a user-friendly message in the UI
        alert(
          "A creator with this email or phone number already exists. Please use a different email or phone."
        );
        return null; // Stop further processing
      }
      alert(errorMsg);
      return null;
    }

    const data = await res.json();
    // Example response: { images: [...], videos: [...] }
    return data.data;
  };

  // Helper: Submit the registration form data
  const submitRegistration = async (payload: CreatorRegistrationPayload) => {
    const res = await fetch(
      `${apiUri}/api/v1/creator_center/application/create/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) throw new Error("Failed to submit registration");
    return await res.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);

    try {
      // 1. Get presigned URLs (modified for new structure)
      const includeVideo = !!uploadedVideo;
      const presignedUrls = await getPresignedUrls(
        formData.email,
        formData.countryCode + formData.phone,
        includeVideo
      );
      if (!presignedUrls) {
        setIsSubmitting(false);
        return;
      }

      // 2. Upload all images to S3
      await Promise.all(
        uploadedImages.map((file, idx) =>
          uploadImageToS3(file, presignedUrls.images[idx].url)
        )
      );

      // 2.5. Upload video to S3 only if provided
      if (uploadedVideo) {
        if (!presignedUrls.videos || presignedUrls.videos.length === 0) {
          throw new Error("No presigned URL returned for video upload");
        }
        await uploadVideoToS3(uploadedVideo, presignedUrls.videos[0]);
      }

      // 3. Prepare payload with image keys & optional video key
      const payload: CreatorRegistrationPayload = {
        ...formData,
        instagramHandle: formData.instagramHandle.trim()
          ? formData.instagramHandle
          : "@",
        images: presignedUrls.map((item: { key: string }) => item.key),
        phone: formData.countryCode + formData.phone.replace(/\D/g, ""),
        video: uploadedVideo ? presignedUrls.videos[0].fields.key : null,
      };

      // 4. Submit registration data
      await submitRegistration(payload);

      setIsSubmitting(false);
      alert(
        "Application submitted successfully! We will review your profile and get back to you within 24 hours."
      );
      onNavigate("home");
    } catch (err: any) {
      setIsSubmitting(false);
      alert(
        err?.message ||
          "Something went wrong while submitting your application. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => onNavigate("creators")}
              className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              Become a Creator
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Creator Community
          </h2>
          <p className="text-purple-100 leading-relaxed">
            Fill out this form to start your journey as a Biffle creator. We'll
            review your application and get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <User className="h-6 w-6 mr-2 text-purple-600" />
              Personal Information
            </h3>

            <div className="space-y-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Your first name"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Your last name"
                  required
                />
              </div>

              {/* Country Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select your country code *
                </label>
                <select
                  value={formData.countryCode}
                  onChange={(e) =>
                    handleInputChange("countryCode", e.target.value)
                  }
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-700"
                  required
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.label} ({country.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Please enter your phone number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange(
                        "phone",
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="9876543210"
                    required
                  />
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provide your email address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select your gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Choose gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Age Verification */}
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAbove18}
                    onChange={(e) =>
                      handleInputChange("isAbove18", e.target.checked)
                    }
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    required
                  />
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">
                      Are you 18 years and above? *
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Upload className="h-6 w-6 mr-2 text-purple-600" />
              Profile Images
            </h3>

            <p className="text-gray-600 mb-6">
              Upload 3 high-quality photos of yourself. These will be displayed
              on your creator profile.
            </p>

            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                dragActive
                  ? "border-purple-500 bg-purple-50"
                  : uploadedImages.length >= 3
                  ? "border-gray-200 bg-gray-50"
                  : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedImages.length < 3 ? (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop images here, or{" "}
                    <label className="text-purple-600 hover:text-purple-700 cursor-pointer font-medium">
                      browse files
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">
                    {uploadedImages.length}/3 images uploaded
                  </p>
                  <p className="text-xs text-red-500 mt-1">
                    Each image must be less than 5 MB.
                  </p>
                </>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                  <span className="font-medium">All 3 images uploaded!</span>
                </div>
              )}
            </div>

            {/* Image Preview */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Upload Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Upload className="h-6 w-6 mr-2 text-purple-600" />
              Introduction Video
            </h3>
            <p className="text-gray-600 mb-6">
              Upload a short intro/about video (Max 50MB, MP4 only)
            </p>
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                dragVideoActive
                  ? "border-purple-500 bg-purple-50"
                  : uploadedVideo
                  ? "border-gray-200 bg-gray-50"
                  : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
              }`}
              onDragEnter={handleVideoDrag}
              onDragLeave={handleVideoDrag}
              onDragOver={handleVideoDrag}
              onDrop={handleVideoDrop}
            >
              {!uploadedVideo ? (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop video here, or{" "}
                    <label className="text-purple-600 hover:text-purple-700 cursor-pointer font-medium">
                      browse file
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files && e.target.files[0];
                          if (!file) return;
                          if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
                            alert("Video must be less than 50MB.");
                          } else {
                            setUploadedVideo(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">
                    {uploadedVideo ? 1 : 0}/1 video uploaded
                  </p>
                  <p className="text-xs text-red-500 mt-1">
                    Video is mandatory. Max size: 50MB.
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center text-green-600">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <span className="font-medium mb-2">Video uploaded!</span>
                  <video controls className="rounded-lg w-full max-w-md mb-2">
                    <source
                      src={URL.createObjectURL(uploadedVideo)}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-gray-700 text-sm">
                      {uploadedVideo.name} (
                      {(uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                    <button
                      type="button"
                      onClick={() => setUploadedVideo(null)}
                      className="bg-red-500 text-white rounded-full p-1 ml-2 hover:bg-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Building className="h-6 w-6 mr-2 text-purple-600" />
              Professional Information
            </h3>

            <div className="space-y-6">
              {/* Agency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select your agency *
                </label>
                <select
                  value={formData.agency}
                  onChange={(e) => handleInputChange("agency", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Choose your agency type</option>
                  {agencies.map((agency) => (
                    <option key={agency} value={agency}>
                      {agency}
                    </option>
                  ))}
                </select>
              </div>

              {/* Instagram Handle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share your Instagram handle *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Instagram className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                    <span className="text-gray-500">@</span>
                  </div>
                  <input
                    type="text"
                    value={formData.instagramHandle}
                    onChange={(e) =>
                      handleInputChange(
                        "instagramHandle",
                        e.target.value.replace("@", "")
                      )
                    }
                    className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="your_instagram_handle"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center">
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="bg-mint-500 text-white px-12 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ backgroundColor: "#27CDB1" }}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting Application...</span>
                  </div>
                ) : (
                  "Submit Application"
                )}
              </button>

              <p className="text-sm text-gray-500 mt-4">
                By submitting, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
