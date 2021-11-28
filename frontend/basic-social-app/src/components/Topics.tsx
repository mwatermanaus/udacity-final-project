import update from 'immutability-helper';
import * as React from 'react';
import Auth from '../auth/Auth';
import { History } from 'history';

import { getTopics } from '../api/basic-social-api';
import { Grid, Loader } from 'semantic-ui-react';

interface TopicsProps {
    auth: Auth;
    history: History;
}

interface TopicsState {
    topics: [];
    loadingTopics: boolean;
} 

export class Topics extends React.PureComponent<TopicsProps, TopicsState> {
    state: TopicsState = {
        topics: [],
        loadingTopics: true
    }

    render() {
        return (
            <div>
                {this.renderTopics()}
            </div>
        );
    }

    renderTopics() {
        if (this.state.loadingTopics){
            return this.renderLoading();
        }

        return this.renderTopicsList();
    }

    renderLoading() {
        return (
            <div>
                <Grid.Row>
                    <Loader indeterminate active inline="centered">
                        Loading topics.
                    </Loader>
                </Grid.Row>
            </div>
        );
    }

    renderTopicsList() {
        return (
            <div>Testing...</div>
        );
    }

}