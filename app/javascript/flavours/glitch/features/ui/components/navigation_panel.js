import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { timelinePreview, showTrends } from 'flavours/glitch/initial_state';
import ColumnLink from 'flavours/glitch/features/ui/components/column_link';
import DisabledAccountBanner from './disabled_account_banner';
import FollowRequestsColumnLink from './follow_requests_column_link';
import ListPanel from './list_panel';
import NotificationsCounterIcon from './notifications_counter_icon';
import SignInBanner from './sign_in_banner';
import { preferencesLink, relationshipsLink } from 'flavours/glitch/utils/backend_links';
import NavigationPortal from 'flavours/glitch/components/navigation_portal';

const messages = defineMessages({
  home: { id: 'tabs_bar.home', defaultMessage: 'Home' },
  notifications: { id: 'tabs_bar.notifications', defaultMessage: 'Notifications' },
  explore: { id: 'explore.title', defaultMessage: 'Explore' },
  local: { id: 'tabs_bar.local_timeline', defaultMessage: 'Local' },
  federated: { id: 'tabs_bar.federated_timeline', defaultMessage: 'Federated' },
  direct: { id: 'navigation_bar.direct', defaultMessage: 'Direct messages' },
  favourites: { id: 'navigation_bar.favourites', defaultMessage: 'Favourites' },
  bookmarks: { id: 'navigation_bar.bookmarks', defaultMessage: 'Bookmarks' },
  lists: { id: 'navigation_bar.lists', defaultMessage: 'Lists' },
  preferences: { id: 'navigation_bar.preferences', defaultMessage: 'Preferences' },
  followsAndFollowers: { id: 'navigation_bar.follows_and_followers', defaultMessage: 'Follows and followers' },
  about: { id: 'navigation_bar.about', defaultMessage: 'About' },
  search: { id: 'navigation_bar.search', defaultMessage: 'Search' },
  app_settings: { id: 'navigation_bar.app_settings', defaultMessage: 'App settings' },
});

export default @injectIntl
class NavigationPanel extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
    identity: PropTypes.object.isRequired,
  };

  static propTypes = {
    onOpenSettings: PropTypes.func,
  };

  render() {
    const { intl, onOpenSettings } = this.props;
    const { signedIn, disabledAccountId } = this.context.identity;

    return (
      <div className='navigation-panel'>
        {signedIn && (
          <React.Fragment>
            <ColumnLink transparent to='/home' icon='home' text={intl.formatMessage(messages.home)} />
            <ColumnLink transparent to='/notifications' icon={<NotificationsCounterIcon className='column-link__icon' />} text={intl.formatMessage(messages.notifications)} />
            <FollowRequestsColumnLink />
          </React.Fragment>
        )}

        {showTrends ? (
          <ColumnLink transparent to='/explore' icon='hashtag' text={intl.formatMessage(messages.explore)} />
        ) : (
          <ColumnLink transparent to='/search' icon='search' text={intl.formatMessage(messages.search)} />
        )}

        {(signedIn || timelinePreview) && (
          <>
            <ColumnLink transparent to='/web/public/local' icon='users' text={intl.formatMessage(messages.local)} />
            <ColumnLink transparent exact to='/web/public' icon='globe' text={intl.formatMessage(messages.federated)} />
          </>
        )}

        {!signedIn && (
          <div className='navigation-panel__sign-in-banner'>
            <hr />
            { disabledAccountId ? <DisabledAccountBanner /> : <SignInBanner /> }
          </div>
        )}

        {signedIn && (
          <React.Fragment>
            <ColumnLink transparent to='/conversations' icon='at' text={intl.formatMessage(messages.direct)} />
            <ColumnLink transparent to='/favourites' icon='star' text={intl.formatMessage(messages.favourites)} />
            <ColumnLink transparent to='/bookmarks' icon='bookmark' text={intl.formatMessage(messages.bookmarks)} />
            <ColumnLink transparent to='/lists' icon='list-ul' text={intl.formatMessage(messages.lists)} />

            <ListPanel />

            <hr />

            {!!preferencesLink && <ColumnLink transparent href={preferencesLink} icon='cog' text={intl.formatMessage(messages.preferences)} />}
            <ColumnLink transparent onClick={onOpenSettings} icon='cogs' text={intl.formatMessage(messages.app_settings)} />
          </React.Fragment>
        )}

        <div className='navigation-panel__legal'>
          <hr />
          <ColumnLink transparent to='/about' icon='ellipsis-h' text={intl.formatMessage(messages.about)} />
        </div>

        <NavigationPortal />
      </div>
    );
  }

}
