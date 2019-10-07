import * as React from 'react';
import * as RX from 'reactxp';
import Navigator, { NavigatorDelegateSelector as DelegateSelector, Types } from 'reactxp-navigation';

import { MainPanel } from './MainPanel';

enum NavigationRouteId {
    MainPanel
}

const styles = {
    // Standard navigator style should be an object. So we have to disable caching here.
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f5fcff'
    }, false)
};

export class RootView extends RX.Component<RX.CommonProps, RX.Stateless> {
    private _navigator: Navigator | undefined;

    componentDidMount() {
        if (this._navigator) {
            this._navigator.immediatelyResetRouteStack([{
                routeId: NavigationRouteId.MainPanel,
                sceneConfigType: Types.NavigatorSceneConfigType.Fade
            }]);
        }
    }

    render() {
        return (
            <Navigator
                delegateSelector={ DelegateSelector }
                cardStyle={ styles.navCardStyle }
                renderScene={ this._renderScene }
                ref={ this._onNavigatorRef }
            />
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        this._navigator = navigator;
    }

    private _renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return (
                    // tslint:disable-next-line:no-console
                    <MainPanel onPressNavigate={ () => console.log('Hola') } />
                );
        }

        return null;
    }
}
