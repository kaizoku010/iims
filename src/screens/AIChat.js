import React, { useState } from 'react';
import './AIChat.css';
import ChatItem from "../atoms/ChatItem.js"
import AddIc from "../media/add.png"

const AIChat = ({ data }) => {
  const [messages, setMessages] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleMessageSubmit = (message) => {
    //  user message to chat
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);

    // Processing message
    processUserMessage(message);
  };
  const processUserMessage = (message) => {
    //  logic to search for relevant case details
    const results = searchCases(message);

    // Formal reply from the AI
    let formattedResponse = <div ><p >Hello sir, here are the search results:</p></div>;

    // If there are matching cases, format them
    if (results !== "Sorry, I couldn't find any matching cases.") {
      // Splitting results into individual case details
      const individualCases = results.split('Case ID: ');

      // Formatting each case detail
      const formattedCases = individualCases.slice(1).map((caseDetails, index) => {
        const formattedCase = caseDetails.trim().split('\n').map((line, idx) => {
          // Adding bullet points for better readability
          if (idx > 0) {
            return <p className='line-one'>{line}</p>;
          }
          return <h4 className='line-2'>Case ID :{line}</h4>;
        });

        // Adding a number for each case
        return <div className="result-element" key={index}>{formattedCase}</div>;
      });

      // Joining the formatted cases
      formattedResponse = (
        <div>
          <p className='your-search'>Here are the search results:</p>
          {formattedCases}
        </div>
      );
    } else {
      // If no matching cases found
      formattedResponse = <p>{results}</p>;
    }

    // Add AI response to chat
    setMessages((prevMessages) => [...prevMessages, { text: formattedResponse, sender: 'bot' }]);

    // Update recent searches
    setRecentSearches((prevSearches) => [message, ...prevSearches.slice(0, 4)]);
  };



  const formatCaseDetails = (caseData) => {
    return `Case ID: ${caseData.id}\nIntel Type: ${caseData.intelType}\nPriority: ${caseData.priority}\nDate Created: ${caseData.dateCreated}\nPosted By: ${caseData.postedBy}\nVictims: ${caseData.victims.join(', ')}\nStatus: ${caseData.status}\nLocation: ${caseData.location}\nDescription: ${caseData.desc}\nSuspects: ${caseData.suspects.join(', ')}`;
  };

  const searchCases = (query) => {
    // Convert query to lowercase for case-insensitive matching
    const lowercaseQuery = query.toLowerCase();

    // Define keywords for case statuses
    const caseStatusKeywords = ['open', 'closed'];

    // Extract case status from the query
    const caseStatus = caseStatusKeywords.find(keyword => lowercaseQuery.includes(keyword));

    // Define keywords for locations (assuming locations are mentioned in the query)
    const locationKeywords = ['kampala', 'entebbe', 'jinja', 'mbarara', 'masaka', 'fort portal', 'gulu', 'mbale', 'kasese', 'lira'];

    const agencyFiles = ["ISO", "ESO", "Police", "CT", "CMI"];
    const agency = agencyFiles.find(keyword => lowercaseQuery.includes(keyword))
    // Extract location from the query
    const location = locationKeywords.find(keyword => lowercaseQuery.includes(keyword));

    // Filter cases based on extracted case status and location
    let matchingCases = data.allInvestigations;
    if (caseStatus) {
      matchingCases = matchingCases.filter(caseData => caseData.status.toLowerCase() === caseStatus);
    }
    if (location) {
      matchingCases = matchingCases.filter(caseData => caseData.location.toLowerCase().includes(location));
    }

    if (agency) {
      matchingCases = matchingCases.filter(caseData => caseData.agency.toLowerCase().includes(agency))
    }

    // Format and return matching cases
    if (matchingCases.length > 0) {
      return matchingCases.map(formatCaseDetails).join('\n\n');
    } else {
      return 'Sorry, I couldn\'t find any matching cases.';
    }
  };

  const clearBotMessages = () => {
    // Filter out bot messages and update state
    setMessages([]); // Clear all messages

  };

  return (
    <div className="ai-container">
      <div className='main-ai-chat-section'>
        <div className="chatbot-messages">

          {messages.length > 0 ? messages.map((message, index) => (

            <ChatItem key={index}
              message={message.text}
              sender={message.sender}
            // resultCount={message.sender=="bot" ? resultCount: undefined}
            />
            
          )) : <div className='empty-div'>
            
            <h1 className='empty-chat'>Hello,</h1>
            <h1 className='empty-chat-text-two'>How can I help you today?</h1>  
            <div className='try-these'>
              <div className='try-one'>
              <p className='keywords-empty'>Use Keywords in your search Query, i.e..Pull up case files in Kampala.</p>
              <img className='add-ic' src={AddIc} />
              </div>
              <div className='try-two'>
              <p className='keywords-empty'>Another example of Keyword usage, Trafficking cases or cases on Drug Trafficking.</p>
              <img className='add-ic' src={AddIc} />
              </div>

            </div>
            {/* <p>You can look up a case file, by casedID, location, suspect name, victim name, </p>
            <p>investigation type, time of investigation.</p>           */}
            
            </div>
            }

        </div>
        {messages.length = 0 ?  <div className="recent-searches">

          <h3 className='recents-text'>Recent Searches:</h3>
          <ul className='recent-list'>
            {recentSearches.map((search, index) => (
              <li className='rest-item' key={index}>{search}</li>
            ))}
          </ul>
          <button type='button' className='clear-all btn btn-warning' onClick={clearBotMessages}>Clear Chat</button>

        </div> : ""}
       

      </div>



      <div className='ai-input-field'>
        <input
          className='user-query'
          type="text"
          placeholder="user keywords to look up cases or intel..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleMessageSubmit(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>

    </div>
  );
};

export default AIChat;
