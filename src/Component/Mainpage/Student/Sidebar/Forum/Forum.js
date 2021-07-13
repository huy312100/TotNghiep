import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import "../../../../../style/Forum.css";
import Sidebar from '../../Sidebar';
import ViewForums from './ViewForums';
import PostForum from './PostForum';


function Forum() {
    return <div>
        <Navbar/>
        <Sidebar/>
        <ViewForums/>
    </div>
}

export default Forum;