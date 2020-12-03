import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import DoughnutChart from './DoughnutChart/DoughnutChart';
import AssignedList from './AssignedList/AssignedList';
import IssueHistory from './IssueHistory/IssueHistory';
import ProjectOverview from './ProjectOverview/ProjectOverview';
import IssueTypeBlocks from './IssueTypes/IssueTypes';
import { IssueTypes } from '../../../../shared/constants/issues';
import {
  Row,
  SectionContainer,
  SectionTitle,
  SectionContent,
  TitleDescription
} from '../DashBoard.style';

const ProjectDashBoard = ({ dashboardParams, tickets }) => {
  return (
    <Fragment>
      <Row>
        <SectionContainer width="55%">
          <ProjectOverview projectId={dashboardParams} />
        </SectionContainer>
        <SectionContainer width="43%" noBoxShadow={true} >
          <IssueTypeBlocks tickets={tickets}/>
        </SectionContainer>
      </Row>
      <Row>
        <SectionContainer width="49%">
          <SectionTitle>Issue Status</SectionTitle>
          <DoughnutChart projectId={dashboardParams} tickets={tickets.filter(ticket => ticket.issueType !== IssueTypes.EPIC)} />
        </SectionContainer>
        <SectionContainer width="49%">
          <SectionTitle>Assigned to me</SectionTitle>
          <SectionContent height="400px">
            <AssignedList projectId={dashboardParams} tickets={tickets}/>
          </SectionContent>
        </SectionContainer>
      </Row>
      <Row>
        <SectionContainer width="100%" >
          <SectionTitle>Project History<TitleDescription>Display the latest 30 histories.</TitleDescription></SectionTitle>
          <SectionContent height="450px" >
            <IssueHistory projectId={dashboardParams} tickets={tickets} />
          </SectionContent>
        </SectionContainer>
      </Row>
    </Fragment>
  )
}

ProjectDashBoard.propTypes = {

}

export default ProjectDashBoard