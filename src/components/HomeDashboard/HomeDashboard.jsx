import React, { useState, useMemo } from "react";
import { Badge } from "../../components/ui/badge";
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis, 
  Tooltip, Cell, ResponsiveContainer, LineChart, Line
} from "recharts";
import Intel from "../../TestDataPoint/Intel";
import "./HomeDashboard.css";

function HomeDashboard() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all');
  const [activeModal, setActiveModal] = useState(null);

  // Modal content configurations
  const modalContent = {
    locationStats: {
      title: "Location Analysis",
      content: (analytics) => (
        <div className="modal-content">
          <div className="detailed-stats">
            <h3>High Activity Areas</h3>
            {analytics.locationData.map((loc) => (
              <div key={loc.name} className="stat-row">
                <span>{loc.name}</span>
                <div className="stat-details">
                  <span>{loc.value} cases</span>
                  <span className="trend">
                    {Math.random() > 0.5 ? "↑" : "↓"} {Math.floor(Math.random() * 20)}% from last month
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="risk-assessment">
            <h3>Risk Assessment</h3>
            {analytics.locationData.map((loc) => (
              <div key={loc.name} className="risk-row">
                <span>{loc.name}</span>
                <Badge className={loc.value > 5 ? "high-risk" : "low-risk"}>
                  {loc.value > 5 ? "High Risk" : "Low Risk"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )
    },
    caseTypes: {
      title: "Case Type Analysis",
      content: (analytics) => (
        <div className="modal-content">
          <div className="type-breakdown">
            {analytics.typeData.map((type) => (
              <div key={type.name} className="type-row">
                <h3>{type.name}</h3>
                <div className="type-stats">
                  <div className="stat-item">
                    <span>Total Cases</span>
                    <span>{type.value}</span>
                  </div>
                  <div className="stat-item">
                    <span>Resolution Rate</span>
                    <span>{Math.floor(Math.random() * 40 + 60)}%</span>
                  </div>
                  <div className="stat-item">
                    <span>Avg Resolution Time</span>
                    <span>{Math.floor(Math.random() * 10 + 5)} days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    agencyWorkload: {
      title: "Agency Performance Metrics",
      content: (analytics) => (
        <div className="modal-content">
          {Object.entries(analytics.agencyWorkload).map(([agency, count]) => (
            <div key={agency} className="agency-metrics">
              <h3>{agency}</h3>
              <div className="metric-grid">
                <div className="metric-item">
                  <span>Active Cases</span>
                  <span>{count}</span>
                </div>
                <div className="metric-item">
                  <span>Success Rate</span>
                  <span>{Math.floor(Math.random() * 20 + 80)}%</span>
                </div>
                <div className="metric-item">
                  <span>Response Time</span>
                  <span>{Math.floor(Math.random() * 4 + 1)}h</span>
                </div>
                <div className="metric-item">
                  <span>Resource Utilization</span>
                  <span>{Math.floor(Math.random() * 30 + 70)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    predictions: {
      title: "Predictive Analytics",
      content: (analytics) => (
        <div className="modal-content">
          <div className="prediction-metrics">
            <div className="prediction-section">
              <h3>Case Volume Forecast</h3>
              <div className="forecast-grid">
                <div className="forecast-item">
                  <span>Next Week</span>
                  <span>{Math.floor(analytics.totalCases * 1.1)} cases</span>
                </div>
                <div className="forecast-item">
                  <span>Next Month</span>
                  <span>{Math.floor(analytics.totalCases * 1.25)} cases</span>
                </div>
                <div className="forecast-item">
                  <span>Next Quarter</span>
                  <span>{Math.floor(analytics.totalCases * 1.5)} cases</span>
                </div>
              </div>
            </div>
            <div className="prediction-section">
              <h3>Risk Trends</h3>
              <div className="trend-grid">
                {Object.entries(analytics.priorityBreakdown).map(([priority, count]) => (
                  <div key={priority} className="trend-item">
                    <span>{priority}</span>
                    <span className={count > 5 ? "trend-up" : "trend-down"}>
                      {count > 5 ? "↑" : "↓"} {Math.floor(Math.random() * 20)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    recentIntelligence: {
      title: "Recent Intelligence Details",
      content: (analytics) => (
        <div className="modal-content">
          <div className="intel-detailed-view">
            <div className="intel-filters">
              <select className="intel-filter">
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select className="intel-filter">
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div className="intel-list">
              {analytics.recentActivities.map((intel) => (
                <div key={intel.id} className="intel-card-detailed">
                  <div className="intel-header">
                    <div className="intel-badges">
                      <Badge className={`priority-${intel.priority}`}>{intel.priority}</Badge>
                      <Badge className={`status-${intel.status}`}>{intel.status}</Badge>
                    </div>
                    <span className="intel-date">{new Date().toLocaleDateString()}</span>
                  </div>
                  <h3>{intel.intelType}</h3>
                  <p className="intel-description">{intel.desc}</p>
                  <div className="intel-metadata">
                    <div className="metadata-item">
                      <span>Location:</span>
                      <span>{intel.location}</span>
                    </div>
                    <div className="metadata-item">
                      <span>Agency:</span>
                      <span>{intel.agency}</span>
                    </div>
                    <div className="metadata-item">
                      <span>Response Time:</span>
                      <span>{Math.floor(Math.random() * 24)} hours</span>
                    </div>
                  </div>
                  <div className="intel-actions">
                    <button className="action-btn">View Details</button>
                    <button className="action-btn">Assign Task</button>
                    <button className="action-btn">Mark Priority</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    totalCases: {
      title: "Total Cases Overview",
      content: (analytics) => (
        <div className="modal-content">
          <div className="cases-summary">
            <div className="summary-stats">
              <div className="stat-block">
                <h3>Total Active Cases</h3>
                <p className="stat-number">{analytics.totalCases}</p>
                <p className="stat-trend">↑ 15% from last month</p>
              </div>
              <div className="stat-block">
                <h3>Average Resolution Time</h3>
                <p className="stat-number">{analytics.caseResolutionTime.average}</p>
                <p className="stat-trend">↓ 2 days improvement</p>
              </div>
            </div>
            <div className="cases-breakdown">
              <h3>Case Status Distribution</h3>
              <div className="status-grid">
                {Object.entries(analytics.caseResolutionTime).map(([status, time]) => (
                  <div key={status} className="status-item">
                    <span className="status-label">{status}</span>
                    <span className="status-value">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    criticalCases: {
      title: "Critical Cases Analysis",
      content: (analytics) => (
        <div className="modal-content">
          <div className="critical-overview">
            <div className="critical-stats">
              <div className="stat-block urgent">
                <h3>Critical Cases</h3>
                <p className="stat-number">{analytics.criticalCases}</p>
                <p className="stat-trend">Requires Immediate Attention</p>
              </div>
              <div className="response-metrics">
                <h3>Response Metrics</h3>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <span>Average Response Time</span>
                    <span>2.5 hours</span>
                  </div>
                  <div className="metric-item">
                    <span>Resolution Rate</span>
                    <span>92%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="priority-actions">
              <h3>Recommended Actions</h3>
              <ul className="action-list">
                <li>Immediate resource allocation needed in Region A</li>
                <li>Escalate 3 pending cases to high command</li>
                <li>Schedule emergency response team briefing</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    openCases: {
      title: "Open Cases Status",
      content: (analytics) => (
        <div className="modal-content">
          <div className="open-cases-analysis">
            <div className="status-summary">
              <div className="stat-block">
                <h3>Total Open Cases</h3>
                <p className="stat-number">{analytics.openCases}</p>
                <p className="stat-trend">↓ 5% from last week</p>
              </div>
              <div className="workload-distribution">
                <h3>Agency Workload</h3>
                <div className="agency-grid">
                  {Object.entries(analytics.agencyWorkload).map(([agency, count]) => (
                    <div key={agency} className="agency-item">
                      <span>{agency}</span>
                      <span>{count} cases</span>
                      <div className="progress-bar">
                        <div 
                          className="progress" 
                          style={{width: `${(count/analytics.totalCases)*100}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
  };

  // Modal component
  const Modal = ({ title, children, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );

  const analytics = useMemo(() => {
    const data = Intel.allInvestigations;
    
    // Enhanced analytics
    const priorityBreakdown = data.reduce((acc, item) => {
      acc[item.priority] = (acc[item.priority] || 0) + 1;
      return acc;
    }, {});

    const agencyWorkload = data.reduce((acc, item) => {
      acc[item.agency] = (acc[item.agency] || 0) + 1;
      return acc;
    }, {});

    // Mock predictions
    const riskScore = Math.round((priorityBreakdown.critical * 3 + priorityBreakdown.high * 2) / data.length * 100);
    const predictedCases = Math.round(data.length * 1.15); // 15% increase prediction
    
    return {
      totalCases: data.length,
      criticalCases: data.filter(item => item.priority === 'critical').length,
      openCases: data.filter(item => item.status === 'open').length,
      recentActivities: data.slice(0, 5),
      locationData: Object.entries(
        data.reduce((acc, item) => {
          acc[item.location] = (acc[item.location] || 0) + 1;
          return acc;
        }, {})
      ).map(([name, value]) => ({ name, value })),
      typeData: Object.entries(
        data.reduce((acc, item) => {
          acc[item.intelType] = (acc[item.intelType] || 0) + 1;
          return acc;
        }, {})
      ).map(([name, value]) => ({ name, value })),
      priorityBreakdown,
      agencyWorkload,
      riskScore,
      predictedCases,
      highRiskLocations: data
        .filter(item => item.priority === 'critical' || item.priority === 'high')
        .reduce((acc, item) => {
          acc[item.location] = (acc[item.location] || 0) + 1;
          return acc;
        }, {}),
      caseResolutionTime: {
        average: "14 days",
        critical: "5 days",
        high: "10 days",
        medium: "15 days",
        low: "20 days"
      }
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Main Node</h1>
        <div className="time-filters">
          {['all', 'month', 'week'].map(filter => (
            <button 
              key={filter}
              className={timeFilter === filter ? 'active' : ''} 
              onClick={() => setTimeFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)} Time
            </button>
          ))}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card" onClick={() => setActiveModal('totalCases')}>
          <h3>Total Cases</h3>
          <p>{analytics.totalCases}</p>
        </div>
        <div className="stat-card" onClick={() => setActiveModal('criticalCases')}>
          <h3>Critical Cases</h3>
          <p>{analytics.criticalCases}</p>
        </div>
        <div className="stat-card" onClick={() => setActiveModal('openCases')}>
          <h3>Open Cases</h3>
          <p>{analytics.openCases}</p>
        </div>
        <div className="stat-card prediction">
          <h3>Risk Score</h3>
          <p>{analytics.riskScore}%</p>
          <span className="trend">Based on current cases</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="chart-card" onClick={() => setActiveModal('locationStats')}>
          <h2>Location Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={analytics.locationData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                label
              >
                {analytics.locationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card" onClick={() => setActiveModal('caseTypes')}>
          <h2>Case Types</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analytics.typeData}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="analysis-card" onClick={() => setActiveModal('agencyWorkload')}>
          <h2>Agency Workload</h2>
          <div className="workload-list">
            {Object.entries(analytics.agencyWorkload).map(([agency, count]) => (
              <div key={agency} className="workload-item">
                <span>{agency}</span>
                <div className="workload-bar">
                  <div 
                    className="workload-fill" 
                    style={{width: `${(count / analytics.totalCases) * 100}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analysis-card predictions" onClick={() => setActiveModal('predictions')}>
          <h2>Case Resolution Times</h2>
          <div className="resolution-list">
            {Object.entries(analytics.caseResolutionTime).map(([priority, time]) => (
              <div key={priority} className="resolution-item">
                <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analysis-card predictions" onClick={() => setActiveModal('predictions')}>
          <h2>Predictions</h2>
          <div className="prediction-list">
            <div className="prediction-item">
              <span>Expected Cases (Next Month)</span>
              <span>{analytics.predictedCases}</span>
            </div>
            <div className="prediction-item">
              <span>Risk Trend</span>
              <span className={analytics.riskScore > 50 ? 'trend-negative' : 'trend'}>
                {analytics.riskScore > 50 ? '↑ Increasing' : '↓ Decreasing'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal rendering */}
      {activeModal && (
        <Modal 
          title={modalContent[activeModal].title}
          onClose={() => setActiveModal(null)}
        >
          {modalContent[activeModal].content(analytics)}
        </Modal>
      )}

      <div className="recent-activities" onClick={() => setActiveModal('recentIntelligence')}>
        <h2>Recent Intelligence</h2>
        <div className="activities-grid">
          {analytics.recentActivities.map((intel) => (
            <div key={intel.id} className="activity-card">
              <div className="activity-header">
                <Badge className={`priority-${intel.priority}`}>{intel.priority}</Badge>
                <Badge className={`status-${intel.status}`}>{intel.status}</Badge>
              </div>
              <h3>{intel.intelType}</h3>
              <p>{intel.desc.substring(0, 100)}...</p>
              <div className="activity-footer">
                <span>{intel.location}</span>
                <span>{intel.agency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;




