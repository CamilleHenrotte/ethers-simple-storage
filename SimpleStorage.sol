//SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;

contract SimpleStorage {
    uint256 favoriteNumber = 5;
    mapping(string => uint256) public nameTOFavoriteNumber;
    People public person = People({favoriteNumber: 2, name: "Patrick"});
    People[] public people;
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    function retreive() public view returns (uint256) {
        return favoriteNumber;
    }

    function add() public pure returns (uint256) {
        return 1 + 1;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        People memory newPerson = People({
            favoriteNumber: _favoriteNumber,
            name: _name
        });
        people.push(newPerson);
        nameTOFavoriteNumber[_name] = _favoriteNumber;
    }
}
