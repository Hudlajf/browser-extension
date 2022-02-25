import {appState, hooks, ReefSigner} from '@reef-defi/react-lib';
import React, {useEffect, useState} from 'react';
import {EvmBindComponent} from './EvmBindComponent';
import {SigningOrChildren} from './SigningOrChildren';

export const Bind = (): JSX.Element => {
  const accounts: ReefSigner[] | undefined = hooks.useObservableState(appState.signers$);
  const selectedSigner: ReefSigner | undefined = hooks.useObservableState(appState.selectedSigner$);
  const [bindSigner, setBindSigner] = useState<ReefSigner>();
  const theme = localStorage.getItem('theme');

  useEffect(() => {
    const [, params] = window.location.href.split('?');
    const urlParams = params?.split('&').map((e) => e.split('=').map(decodeURIComponent)).reduce((r: any, [k, v]) => (r[k] = v, r), {});
    const { bindAddress } = urlParams || {};
    let paramAccount;

    if (bindAddress) {
      paramAccount = accounts?.find((acc) => acc.address === bindAddress);
    }

    setBindSigner(paramAccount || selectedSigner);
  }, [selectedSigner]);

  return (
    <SigningOrChildren>
      {bindSigner && accounts && (<div className={theme === 'dark' ? 'theme-dark' : ''}>
        <EvmBindComponent
          bindSigner={bindSigner}
          signers={accounts}
        ></EvmBindComponent></div>)}
    </SigningOrChildren>
  );
};
