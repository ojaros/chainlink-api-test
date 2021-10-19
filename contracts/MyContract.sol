// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title MyContract is an example contract which requests data from
 * the Chainlink network
 * @dev This contract is designed to work on multiple networks, including
 * local test networks
 */
contract MyContract is ChainlinkClient, ERC721 {
  using Chainlink for Chainlink.Request;

  address constant ORACLE = 0xF405B99ACa8578B9eb989ee2b69D518aaDb90c1F;
  bytes32 constant JOB_ID = bytes32("7c4b968028f74b2eabd7d428f03ba45c");
  uint256 constant FEE = 0.1 * 10 ** 18;

  bytes32 internal keyHash;
  uint256 public fee;
  uint256 public tokenCounter;

  enum Game{FORTNITE, CSGO, MINECRAFT}


  // bytes32 public data;

  bytes32 public data;
  string public image_url;

  struct Clip {
      string name;
      string url;
  }

  Clip[] public clips;

  mapping(bytes32 => string) public requestToClipName;
  mapping(bytes32 => address) public requestIdToSender;
  mapping(bytes32 => string) public requestIdToTokenURI;

  event requestedCollectible(bytes32 indexed requestId);

  mapping(bytes32 => uint256) requestToTokenId;


  constructor(address _link) 
  ERC721("Tests", "TST")
  public 
  {
    if (_link == address(0)) {
      setPublicChainlinkToken();
    } else {
      setChainlinkToken(_link);
    }
    setChainlinkOracle(0xF405B99ACa8578B9eb989ee2b69D518aaDb90c1F);
    tokenCounter = 0;
  }

  function createCollectible(string memory tokenURI) public returns (bytes32) {

  }


  function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
  }


  function createRequestTo(
    string memory _url,
    string memory _path,
    string memory tokenURI
  )
    public
    returns (bytes32 requestId) 
  {
    Chainlink.Request memory req = buildChainlinkRequest(JOB_ID, address(this), this.fulfill.selector);
    req.add("get", _url);
    req.add("path", _path);
    // requestOracleData(req, FEE);

    requestId = sendChainlinkRequestTo(ORACLE, req, FEE);
    // requestToClipName[requestId] = name;
    requestIdToTokenURI[requestId] = tokenURI;
    requestIdToSender[requestId] = msg.sender;
    return requestId;
  }

  // event RequestFulfilled(bytes32 indexed requestId, bytes indexed data);


  function fulfill(bytes32 _requestId, bytes32 _data)
    public
    recordChainlinkFulfillment(_requestId)
  {
    address nftOwner = requestIdToSender[_requestId];
    uint256 newId = clips.length;
    string memory tokenURI = requestIdToTokenURI[_requestId];

    // _safeMint(nftOwner, newItemId);
    // _setTokenURI(newItemId, tokenURI);

    // emit RequestFulfilled(requestId, bytesData);
    data = _data;
    image_url = bytes32ToString(data);

    clips.push(
        Clip(
            requestIdToTokenURI[_requestId],
            image_url
        )
    );
    _safeMint(nftOwner, newId);
  }

  // function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
  //   require(
  //     _isApprovedOrOwner(_msgSender(), tokenId),
  //     "ERC721: transfer caller is not owner nor approved"
  //   );
  //   _setTokenURI(tokenId, _tokenURI);
  // }

  function getNumberOfClips() public view returns (uint256) {
    return clips.length;
  }

  /**
   * @notice Allows the owner to withdraw any LINK balance on the contract
   */
  function withdrawLink() public {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }

  /**
   * @notice Call this method if no response is received within 5 minutes
   * @param _requestId The ID that was generated for the request to cancel
   * @param _payment The payment specified for the request to cancel
   * @param _callbackFunctionId The bytes4 callback function ID specified for
   * the request to cancel
   * @param _expiration The expiration generated for the request to cancel
   */
  function cancelRequest(
    bytes32 _requestId,
    uint256 _payment,
    bytes4 _callbackFunctionId,
    uint256 _expiration
  )
    public
  {
    cancelChainlinkRequest(_requestId, _payment, _callbackFunctionId, _expiration);
  }

  function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
      uint8 i = 0;
      while(i < 32 && _bytes32[i] != 0) {
          i++;
      }
      bytes memory bytesArray = new bytes(i);
      for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
          bytesArray[i] = _bytes32[i];
      }
      return string(bytesArray);
  }
}
