import React, { createContext, useContext } from 'react';

export const ProjectDataContext = createContext();

export const ProjectDataProvider = ({ projectData, children }) => {

  return (
    <ProjectDataContext.Provider value={{projectData}}>
      {children}
    </ProjectDataContext.Provider>
  );
};

export const useProjectData = () => useContext(ProjectDataContext);