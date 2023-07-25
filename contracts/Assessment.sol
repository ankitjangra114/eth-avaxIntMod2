// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;
contract ABC {
    event Depo(uint256 amount);
    event draw(uint256 amount);
    mapping(address => uint256) public balanceOf;
    mapping(address => address) public ownerOf;                                                                                                                                         
    function Balance(address wallAddress) public view returns(uint256) {
    return balanceOf[wallAddress];
    }
    function depoamount(uint256 _amount) public payable {
        uint prebalance= balanceOf[msg.sender];
        balanceOf[msg.sender] += _amount;
        assert(balanceOf[msg.sender] == prebalance + _amount);
        emit Depo(_amount);
    }
    error Insufficient(uint256 balance, uint256 drawAmount);
    function drawamount(uint256 _drawAmount) public {
        uint prebalance = balanceOf[msg.sender];
        if (balanceOf[msg.sender] < _drawAmount) {
            revert Insufficient({
                balance: prebalance,
                drawAmount: _drawAmount
            });
        }
        balanceOf[msg.sender] -= _drawAmount;
        assert(balanceOf[msg.sender] == (prebalance - _drawAmount));
        emit draw(_drawAmount);
    }
    function check() public view returns(uint256) {
    address account = msg.sender;
    return balanceOf[account];
    }
}
