import React, { Fragment, useState } from 'react';
import { IssueTypes, IssuePriorities, IssueColors } from '../../../../../../shared/constants/issues';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectCurrentProjectId, selectProjects } from '../../../../../../redux/projects/projects.selectors';
import { selectUser } from '../../../../../../redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect';
import FormInput from '../../Form/FormInput/FormInput';
import { createNewTicket, createNewEpicTicket } from '../../../../../../redux/tickets/tickets.actions';
import Description from './Description/Description';
import ChildIssue from './ChildIssue/ChildIssue';
import RangedDatePicker from './RangedDatePicker/RangedDatePicker';
import Project from './Project/Project';
import Type from './Type/Type';
import Priority from './Priority/Priority';
import Assignee from './Assignee/Assignee';
import Reporter from './Reporter/Reporter';
import Colors from './Colors/Colors';
import {
  Title,
  SubmitButton,
  TextButton,
  InnerWrapper,
  ButtonsContainer,
} from './IssueCreate.style';
import {
  Container,
  Content,
  Fieldset,
  Diviser,
  ModalContainer
} from '../Modal.style';

const IssueCreate = ({
  setIsModalOpen,
  projects,
  currentProjectId,
  userProfile,
  createNewTicket,
  createNewEpicTicket,
  isEpic,
  defaultStartDate
}) => {
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [issueFormValues, setIssueFormValues] = useState({
    projectId: currentProjectId,
    issueType: (!isEpic ? IssueTypes.TASK : IssueTypes.EPIC),
    summary: '',
    description: '',
    reporterId: userProfile._id,
    assigneeId: '',
    issuePriority: IssuePriorities.MEDIUM,
  });
  // Epic spesific state.
  const [childIssues, setChildIssues] = useState([]);
  const [issueColor, setIssueColor] = useState(IssueColors.PURPLE.name);
  const [dateRange, setDateRange] = useState({
    startDate: (defaultStartDate ? defaultStartDate : null),
    endDate: null
  });

  const { projectId, issueType, summary, description, reporterId, assigneeId, issuePriority } = issueFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(issueFormValues)
    if (isEpic) {
      // Add epic specific states.
      createNewEpicTicket({ ...issueFormValues, issueColor, dateRange }, childIssues)
    } else {
      // Set a linked epic null.
      issueFormValues.linkedEpic = null;
      // Create a new ticket with form values.
      // Get first column where a new ticket is added onto.
      const columnId = projects[currentProjectId].columnOrder[0];
      createNewTicket(issueFormValues, columnId);
    }
    // Close this modal.
    setIsModalOpen(false);
  }

  const handleSelectMenu = (name, value) => {
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  return (
    <ModalContainer>
      <Container onClick={() => { if (isSelectMenuOpen) setIsSelectMenuOpen(false); }}>
        <Content>
          <form onSubmit={handleSubmit}>
            <Title>Create issue</Title>
            <InnerWrapper>
              <Fieldset>
                <Project
                  currentProject={projects[projectId]}
                  projects={projects}
                  handleSelectMenu={handleSelectMenu}
                />
                <Type
                  issueType={issueType}
                  handleSelectMenu={handleSelectMenu}
                />
                <Priority
                  issuePriority={issuePriority}
                  handleSelectMenu={handleSelectMenu}
                />
                <Diviser />
                <FormInput
                  label="Summary"
                  type="text"
                  name="summary"
                  value={summary}
                  onChange={(e) => setIssueFormValues({ ...issueFormValues, summary: e.target.value })}
                  required
                />
                <Description
                  value={description}
                  onChange={(text) => setIssueFormValues({ ...issueFormValues, description: text })}
                />
                {isEpic && (
                  <Fragment>
                    <RangedDatePicker dateRange={dateRange} setDateRange={setDateRange} />
                    <ChildIssue childIssues={childIssues} setChildIssues={setChildIssues} />
                    <Colors issueColor={issueColor} setIssueColor={setIssueColor} />
                  </Fragment>
                )}
                <Assignee
                  assigneeId={assigneeId}
                  handleSelectMenu={handleSelectMenu}
                />
                <Reporter
                  reporterId={reporterId}
                  handleSelectMenu={handleSelectMenu}
                />
              </Fieldset>
            </InnerWrapper>
            <ButtonsContainer isEpicModal={false}>
              <SubmitButton value="Create" type="submit" />
              <TextButton onClick={() => setIsModalOpen(false)}>Cancel</TextButton>
            </ButtonsContainer>
          </form>
        </Content>
      </Container>
    </ModalContainer>
  )
}

IssueCreate.propTypes = {
  userProfile: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  currentProjectId: PropTypes.string.isRequired,
  createNewTicket: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProfile: selectUser,
  projects: selectProjects,
  currentProjectId: selectCurrentProjectId
});

export default connect(mapStateToProps, { createNewTicket, createNewEpicTicket })(IssueCreate);
