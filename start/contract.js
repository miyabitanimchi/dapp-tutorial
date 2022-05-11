/*global ethereum, MetamaskOnboarding */

/*
The `piggybankContract` is compiled from:

  pragma solidity ^0.4.0;
  contract PiggyBank {

      uint private balance;
      address public owner;

      function PiggyBank() public {
          owner = msg.sender;
          balance = 0;
      }

      function deposit() public payable returns (uint) {
          balance += msg.value;
          return balance;
      }

      function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
          require(msg.sender == owner);
          balance -= withdrawAmount;

          msg.sender.transfer(withdrawAmount);

          return balance;
      }
  }
*/

const forwarderOrigin = "http://localhost:9010";

const initialize = () => {
  const onboardButton = document.getElementById("connectButton");

  //Created check function to see if the MetaMask extension is installed
  const isMetamaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  // using @metamask/onboarding' library => https://github.com/MetaMask/metamask-onboarding#metamask-onboarding
  //We create a new MetaMask onboarding object to use in our app
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

  //This will start the onboarding proccess
  const onClickInstall = () => {
    onboardButton.innerText = "Onboarding in progress";
    onboardButton.disabled = true;
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
  };

  const MetaMaskClientCheck = () => {
    if (!isMetamaskInstalled()) {
      //If it isn't installed we ask the user to click to install it
      onboardButton.innerText = "Click here to install MetaMask!";
      //When the button is clicked we call onClickInstall
      onboardButton.onclick = onClickInstall;
      //The button is now disabled
      onboardButton.disabled = false;
    } else {
      onboardButton.innerText = "Connect";
    }
  };
  MetaMaskClientCheck();
};
window.addEventListener("DOMContentLoaded", initialize);
