import React, { useState, useEffect, useContext } from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import cx from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";

import { FcGoogle } from 'react-icons/fc';
import { FaUserAlt } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdEmail } from 'react-icons/md';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import profImage from '../assets/photo/prof.png';
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { FaSchool } from "react-icons/fa6";
import { HiIdentification } from "react-icons/hi2";
import { IoLanguage } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import UserManagementService from '../services/UserManagementService';
import SubjectService from '../services/SubjectService'; 
import { Levels } from '../utils/Levels';
import { Cities } from '../utils/Cities';
import { Languages } from '../utils/Languages';
import subjectlist from '../assets/jsons/subjects.json'
import AuthContext from '../context/AuthContext';

const SignUpProf = () => {
  const [subjects, setSubjects] = useState([]);
  const { token, isAuthenticated, login, logout, user, theme, switchTheme, showFooter, handleFooterDisplay, showSidebar, handleSidebarDisplay } = useContext(AuthContext);
    handleFooterDisplay(true);
    handleSidebarDisplay(false);
  const subjectService = new SubjectService();

  const fetchSubjects = async () => {
    try {
      console.log("Fetching subjects...");
      const fetchedSubjects = await subjectService.getAllSubjects();
      console.log("Fetched subjects:", fetchedSubjects);
      setSubjects(fetchedSubjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };
  
  
  const userManagement = new UserManagementService();
  const [showPassword, setShowPassword] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    institution: '',
    identifier: '',
    level: '',
    subject: '',
    languages: [],
    mode: [],
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleCheckboxChange = (language) => {
    setSelectedLanguage(language);
    setFormData((prevData) => {
      if (prevData.languages.includes(language)) {
        return { ...prevData, languages: prevData.languages.filter((lang) => lang !== language) };
      } else {
        return { ...prevData, languages: [...prevData.languages, language] };
      }
    });
  };
  const navigate = useNavigate()
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleNextStep = () => {
    setFormStep((prevStep) => prevStep + 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await userManagement.registerProfessor(formData);
      console.log(response.data);
      // Use navigate('/signin') to redirect to the login page
      navigate('/signin');
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };
  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="flex items-center justify-center h-max bg-bkg dark:bg-content w-screen">
      <div className="w-full max-w-4xl mt-4 mb-4">
        {/* Grande carte avec border-radius 24 */}
        <div className="w-full bg-bkg rounded-lg overflow-hidden shadow-lg p-6 dark:bg-content" style={{ height: '608px', boxShadow: 'box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);' }}>
          <div className="flex flex-col ss:flex-row w-full">
            {/* Partie gauche avec une image */}
            <div className="w-1/2 bg-cover" style={{ backgroundImage: `url(${profImage})` }}>

            </div>
            {/* Partie droite avec le formulaire */}
            <div className="w-1/2 p-5 ">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-center text-montserrat dark:text-white text-content">
                  Créer un compte
                </h2>
              </div>
              
              <div className="bg-bkg rounded-lg overflow-hidden shadow-lg p-4 dark:bg-content">
                {/* Header */}
                <div className="border-b-2 border-lightGray dark:border-grey p-[16px 8px] mb-4 flex items-center justify-center">
                <div
                  className={cx({
                    [`bg-purple`]: formStep === 1,
                    [`bg-green-500`]: formStep > 1,
                    [`bg-lightGrey`]: formStep <= 1,
                    [`text-white`]: formStep === 1,
                    [`text-content`]: formStep !== 1,
                    'rounded-full w-4 h-4 flex items-center justify-center text-poppins text-xs': true,
                  })}
                >
                  1
                </div>

                  <span className="ml-2 text-xs text-poppins text-content dark:text-lightGrey cursor-pointer" onClick={() => setFormStep(1)}>Personnelles</span>
                  <MdOutlineKeyboardArrowRight className='mx-2 dark:text-lightGrey'/>
                  <div
                  className={cx({
                    [`bg-purple`]: formStep === 2,
                    [`bg-green-500`]: formStep > 2,
                    [`bg-lightGrey`]: formStep <= 2,
                    [`text-white`]: formStep === 2,
                    [`text-content`]: formStep !== 2,
                    'rounded-full w-4 h-4 flex items-center justify-center text-poppins text-xs': true,
                  })}
                >                    2
                  </div>
                  <span className="ml-2 text-xs text-poppins text-content dark:text-lightGrey cursor-pointer" onClick={() => setFormStep(2)}>Etablissement</span>
                  <MdOutlineKeyboardArrowRight className='mx-2 dark:text-lightGrey'/>
                  <div
                  className={cx({
                    [`bg-purple`]: formStep === 3,
                    [`bg-lightGrey`]: formStep <= 3,
                    [`text-white`]: formStep === 3,
                    [`text-content`]: formStep !== 3,
                    'rounded-full w-4 h-4 flex items-center justify-center text-poppins text-xs': true,
                  })}
                >                    3
                  </div>
                  <span className="ml-2 text-xs text-poppins text-content dark:text-lightGrey cursor-pointer" onClick={() => setFormStep(3)}>Enseignement</span>
                </div>


                {formStep === 1 && (
                  <div className="p-[10px 6px] mt-4">
                    <form className="flex flex-col items-center mb-2">
                      <div className="relative flex mb-2 w-full md:w-48 lg:w-64">
                        <div className="relative flex-1 mr-2">
                          <FaUserAlt className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3" />
                          <input
                            type="text"
                            placeholder="Nom"
                            value={formData.lastname}
                            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                            className="border p-2 pl-6 rounded-lg w-full border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                          />
                        </div>
                        <div className="relative flex-1 ml-2">
                          <FaUserAlt className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3" />
                          <input
                            type="text"
                            placeholder="Prénom"
                            value={formData.firstname}
                            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                            className="border p-2 pl-6 rounded-lg w-full border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                          />
                        </div>
                      </div>
                      <div className="relative mb-2">
                        <MdEmail className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3" />
                        <input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="border p-2 pl-6 rounded-lg w-full md:w-48 lg:w-64 border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                        />
                      </div>
                      <div className="relative mb-2">
                        <FaPhoneAlt className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3" />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="border p-2 pl-6 rounded-lg w-full md:w-48 lg:w-64 border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                        />
                      </div>
                      <div className="relative mb-4">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3"
                        />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Mot de passe"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="border p-2 pl-6 rounded-lg w-full md:w-48 lg:w-64 border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                        />
                        <MdRemoveRedEye
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-grey"
                          onClick={handleTogglePassword}
                        />
                      </div>
                      <div className="relative mb-4">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3"
                        />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirmer le mot de passe"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="border  p-2 pl-6 rounded-lg w-full md:w-48 lg:w-64 border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                        />
                        <MdRemoveRedEye
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-grey"
                          onClick={handleTogglePassword}
                        />
                      </div>
                      <div className="circle bg-logo p-3 rounded-full ml-auto border-content hover:scale-110 transition-all duration-300 ease-in-out" style={{ boxShadow: '0 0 8px 4px #B71D83', marginTop: '8px' }}>
                        <FaArrowRight className="text-white" onClick={handleNextStep} />
                      </div>
                    </form>
                  </div>
                )}

                {formStep === 2 && (
                  <div className="p-[10px 6px] mt-4">
                    <form className="flex flex-col items-center mb-2">
                      {/* Part2 */}
                      <div className="relative mb-2">
                        <IoHomeSharp className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3" />

                        <select
                          className="border  p-2 pl-6 rounded-lg w-full md:w-48 lg:w-64 border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        >
                          <option value="" selected hidden>Ville</option>

                          {Object.values(Cities).map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                      <div className="relative mb-2">
                        <FaSchool className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3" />
                        <input
                          type="Etablissement"
                          placeholder="Etablissement Scolaire"
                          value={formData.institution}
                          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                          className="border  p-2 pl-6 rounded-lg w-full md:w-48 lg:w-64 border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                        />
                      </div>
                      <div className="relative mb-2">
                        <HiIdentification className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3" />
                        <input
                          type="Etablissement"
                          placeholder="Id dans l'établissement"
                          value={formData.identifier}
                          onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                          className="border p-2 pl-6 rounded-lg w-full md:w-48 lg:w-64 border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                        />
                      </div>
                      {/* Part2 fin */}
                      <div className="circle bg-logo p-3 rounded-full ml-auto border-content hover:scale-110 transition-all duration-300 ease-in-out" style={{ boxShadow: '0 0 8px 4px #B71D83', marginTop: '8px' }}>
                        <FaArrowRight className="text-white" onClick={handleNextStep} />
                      </div>
                    </form>
                  </div>
                )}
                {formStep === 3 && (
                  <div className="p-[10px 6px] mt-4">
                    <form className="flex flex-col items-center mb-2">
                    <div className="relative mb-2">
                        <FaSchool className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3" />
                        <select
                          className="border  p-2 pl-6 rounded-lg w-full md:w-48 lg:w-64 border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        >
                          <option value="" selected hidden>Niveau scolaire Enseigné</option>

                          {Object.values(Levels).map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}

                        </select>
                      </div>
                      <div className="relative mb-2">
                        <FaBook className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3" />
                        <select
                          className="border  p-2 pl-6 rounded-lg w-full md:w-48 lg:w-64 border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        >
                          <option value="" selected hidden>Matière</option>

                          {subjects.map((subject) => (
  <option key={subject.id} value={subject.id}>
    {subject.name}
  </option>
))}


                        </select>

                      </div>
                      <div className="relative mb-2">
  <div
    onClick={() => setDropdownVisible(!dropdownVisible)}
    className="cursor-pointer flex items-center border p-2 pl-6 pr-4 rounded-lg w-full md:w-48 lg:w-64 border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg relative"
  >
    <IoLanguage className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3" />
    <span className="ml-2">{selectedLanguage || 'Langues d\'enseignement'}</span>
    <span className="absolute top-1/2 right-0 transform -translate-y-1/2 text-grey">
      <RiArrowDropDownLine className="text-content h-7 w-7 dark:text-white" />
    </span>
  </div>

  {dropdownVisible && (
    <div className="absolute top-full left-0 mt-1 bg-white dark:bg-greyInput border border-gray-300 rounded-md p-2 w-full z-10">
      {Object.values(Languages).map((language) => (
        <label key={language} className="flex items-center mb-1 dark:text-white">
          <input
            type="checkbox"
            value={language}
            checked={formData.languages.includes(language)}
            onChange={() => handleCheckboxChange(language)}
            className="mr-2  "
          />
          {language}
        </label>
      ))}
    </div>
  )}
</div>


                      <div className="relative mb-2">
                        <FaVideo className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey h-3 w-3" />
                        <select
                          className="border p-2 pl-6 rounded-lg w-full md:w-48 lg:w-64 border-black border-radius-8 text-sm text-montserrat text-input bg-bkg dark:bg-greyInput dark:border-0 dark:text-bkg"
                          value={formData.mode[0]}
                          defaultValue={"Mode d'enseignement"}
                          onChange={(e) => setFormData({ ...formData, mode: [e.target.value] })}
                        >

                          <option value="Online">En ligne</option>
                          <option value="Direct">Face à face</option>
                        </select>


                      </div>
                      <button
                        type="submit"
                        className="circle bg-logo p-3 rounded-full ml-auto border-content hover:scale-110 transition-all duration-300 ease-in-out"
                        style={{ boxShadow: '0 0 8px 4px #B71D83', marginTop: '8px' }}
                        onClick={handleSubmit}
                      >
                        <FaArrowRight className="text-white" />
                      </button>
                    </form>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-between gap-2 mb-6 text-poppins">
                <span className="mb-2 text-xs text-grey">Ou créer un compte avec</span>
                <div className="circle p-2 rounded-full bg-bkg dark:bg-greyInput hover:scale-110" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}>
                  <FcGoogle className="h-6 w-6 " />
                </div>
              </div>
              <div>

                <div className="mt-2">
                  <p className="text-xs text-grey text-center">En créant un compte chez <span className="text-logo">Sekwilla</span>, vous acceptez <span className="text-blue">les conditions générales d'utilisation</span></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpProf;