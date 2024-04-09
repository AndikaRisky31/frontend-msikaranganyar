import React, { useState, useEffect } from "react";
import { axiosInstanceAuth } from "../../../API/axios";

const Profile = () => {
    const [profile, setProfile] = useState({}); // Initialize with an empty object
    const [countNews, setCountNews] = useState();

    const fetchAdmin = async () => {
        try {
            const response = await axiosInstanceAuth('/admin');
            setCountNews(response.data.numberOfNews)
            setProfile(response.data.data);
        } catch (error) {
           console.error("gagal mengambil data admin", error);
        }
    }

    useEffect(() => {
        fetchAdmin();
    }, []);

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Admin Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Informasi mengenai Admin
                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Full name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {profile.name}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {profile.email}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Role
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {profile.role}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Berita Dibuat
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {countNews}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default Profile;