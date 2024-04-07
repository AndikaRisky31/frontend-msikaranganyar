import React from 'react';
import { CardFooter,Button } from '@material-tailwind/react';
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useHistory } from 'react-router-dom';


const AnnouncementCard = ({ announcement,handleDeleteAnnouncement,showButton = false })=> {
    const history = useHistory();

    const toAnnouncement = () => {
      history.push(`/pengumuman/${announcement.id_announcement}`);
    };
    const toEditAnnouncement = (id_announcement)=>{
      history.push(`/dashboard/pengumuman/addUpdate/${id_announcement}`)
    }
    return (
        <>
        <div className="p-2 cursor-pointer flex">
            <img src={`${process.env.REACT_APP_IMAGE_URL}${announcement.imageURL}`} className="mr-4 object-cover aspect-square w-1/3 object-center" alt="Announcement" />
            <div className="flex flex-col ">
                <div  onClick={() => toAnnouncement()}>
                    <h1 className="font-semibold text-lg ">{announcement.title}</h1>
                    <h2 className="text-gray-500 text-sm xl:w-1/2">{announcement.content}</h2>
                </div>
            <CardFooter className={`flex items-center justify-end mt-auto ${showButton ? '': 'hidden'}`}>
                <Button color="red" className="ml-2" onClick={() => handleDeleteAnnouncement(announcement.id_announcement)}>
                <FaTrash size={8} />
                </Button>
                <Button color="green" className="ml-2" onClick={() => toEditAnnouncement(announcement.id_announcement)}>
                <FaRegEdit size={8} />
                </Button>
            </CardFooter>
            </div>
        </div>
        </>
    )
};
export default AnnouncementCard;