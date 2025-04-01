import { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "tailwindcss";

export default function EventCreationForm() {
  const [messageKey, setMessageKey] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    image: "",
    date: new Date(),
    time: new Date(),
    venue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleDateChange = (date) => setEventData({ ...eventData, date });
  const handleTimeChange = (time) => setEventData({ ...eventData, time });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData({ ...eventData, image: file }); // Store file, not URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const formData = new FormData();
      formData.append("eventName", eventData.eventName);  // Backend expects "title"
      formData.append("description", eventData.description);
      const formattedDate = eventData.date.toISOString().split("T")[0];
      console.log("Formatted Date Type:", typeof formattedDate, "Value:", formattedDate);
      formData.append("date", String(formattedDate));


      // Ensure `time` is in "HH:mm" format
      // Ensure `time` is always in "HH:mm" format
      const formattedTime =
        eventData.time instanceof Date
          ? eventData.time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
          : (typeof eventData.time === "string" ? eventData.time.trim() : "");

      formData.append("time", formattedTime);

      console.log("Final Sent Date:", typeof formattedDate, "Value:", formattedDate);
      console.log("Final Sent Time:", typeof formattedTime, "Value:", formattedTime);
      formData.append("location", eventData.venue);
      formData.append("coverImage", eventData.image); // Append file

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(
        "http://localhost:5000/api/event/admin/createEvent",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );
      console.log(response.data.success);
      if (response.data.success) {
        console.log("success");
        setSuccess(response.data.message);
        setMessageKey(prevKey => prevKey + 1);

        setEventData({
          eventName: "",
          description: "",
          image: "",
          date: new Date(),
          time: new Date(),
          venue: "",
        });
      } else {
        console.log("fail");
        setError(response.data.message);
        setMessageKey(prevKey => prevKey + 1);

      }
    } catch (error) {
      console.log("error");
      setError(error.response?.data?.message || "An error occurred. Please try again.");
      setMessageKey(prevKey => prevKey + 1);

    }
    setMessageKey(prevKey => prevKey + 1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white px-6">
      <div className="bg-[#282424] p-8 rounded-3xl shadow-lg w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-6">Create New Event</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center">
            <label className="text-lg font-medium text-gray-300 mb-2">Upload Event Image</label>
            <div className="relative mt-2 w-80 h-32 bg-gray-700 rounded-lg flex justify-center items-center hover:bg-gray-600 transition cursor-pointer overflow-hidden shadow-md border-2 border-dashed border-gray-500">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="fileUpload" />
              <label htmlFor="fileUpload" className="flex flex-col items-center justify-center w-full h-full cursor-pointer relative">
                {eventData.image ? (
                  <img src={eventData.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-20"></div>
                    <Upload size={40} className="mb-2 text-gray-300 relative" />
                    <p className="text-sm text-gray-400 relative">Click to Upload</p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Event Name</label>
              <input
                type="text"
                name="eventName"
                value={eventData.eventName}
                onChange={handleChange}
                className="w-full p-2.5 bg-[#3a3737] rounded-lg mt-1 outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter event name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Venue</label>
              <input
                type="text"
                name="venue"
                value={eventData.venue}
                onChange={handleChange}
                className="w-full p-2.5 bg-[#3a3737] rounded-lg mt-1 outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter venue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Event Date</label>
              <DatePicker
                selected={eventData.date}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                className="w-full p-2.5 bg-[#3a3737] rounded-lg mt-1 outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Event Time</label>
              <DatePicker
                selected={eventData.time}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="w-full p-2.5 bg-[#3a3737] rounded-lg mt-1 outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Event Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Event Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full p-2.5 bg-[#3a3737] rounded-lg mt-1 outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Describe the event..."
              rows="3"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-500 transition p-3 rounded-lg font-semibold text-lg mt-3"
          >
            Create Event
          </button>
        </form>
      </div>
      <div style={{ position: "relative" }}>
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key={messageKey}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0 }}
              className="login_message login_message-error forgotpassword-message"
              style={{
                position: "fixed",
                bottom: "7.5%",
                left: "40%",
                right: "40%",
                transform: "translateX(-50%)",
                zIndex: 2
              }}                            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        {success && (
          <div className="login_message login_message-success forgotpassword-message" style={{
            position: "fixed",
            bottom: "7.5%",
            left: "40%",
            right: "40%",
            transform: "translateX(-50%)",
            zIndex: 2
          }}>
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
