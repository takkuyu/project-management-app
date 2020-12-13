import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrganization } from '../../redux/organizations/organizations.actions';
import { getRoles } from '../../redux/roles/roles.actions';
import { getProjects } from '../../redux/projects/projects.actions';
import { getMembersOfOrganization } from '../../redux/members/members.actions';
import Board from './Board';
import PropTypes from 'prop-types';
import Spinner from '../../shared/components/WithSpinner/Spinner';

const BoardContainer = ({
  user,
  getRoles,
  getOrganization,
  getProjects,
  getMembersOfOrganization,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)

  // Handles featching all the necessary data before rendering Board component.
  useEffect(() => {
    const fetchInitialData = async () => {
      // Get roles of the user based on user role.
      await getRoles(user.role);
      // Get organization data of the user.
      await getOrganization(user.orgId);
      // Get all the projects of the organization.
      await getProjects(user.orgId);
      // Get all the members of the organization.
      await getMembersOfOrganization(user.orgId);

      setIsLoading(false);
    };
    fetchInitialData();
  }, []);

  return (
    isLoading ? (
      <Spinner />
    ) : (
        <Board
          user={user}
          {...props}
        />
      )
  )
}

BoardContainer.propTypes = {
  user: PropTypes.object.isRequired,
  getRoles: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
  getOrganization: PropTypes.func.isRequired,
  getMembersOfOrganization: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getRoles: (userRole) => dispatch(getRoles(userRole)),
  getOrganization: (userId) => dispatch(getOrganization(userId)),
  getProjects: (orgId) => dispatch(getProjects(orgId)),
  getMembersOfOrganization: (orgId) => dispatch(getMembersOfOrganization(orgId)),
});

export default connect(null, mapDispatchToProps)(BoardContainer);