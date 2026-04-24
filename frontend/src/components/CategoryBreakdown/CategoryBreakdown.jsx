import React from 'react'
import "./CategoryBreakdown.css"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const categories = [
    { name: "Arrays", value: 12, color: "#3b82f6" },
    { name: "Strings", value: 8, color: "#10b981" },
    { name: "Dynamic Programming", value: 5, color: "#f59e0b" },
    { name: "Graphs", value: 3, color: "#ef4444" },
    { name: "Trees", value: 7, color: "#8b5cf6" }
];

const CategoryBreakdown = ({data}) => {
    return (
        <div className='categoryBreakdown'>

            <h3 className="cb-title">Category Breakdown</h3>

            <div className="cb-chart-container">
                {Array.isArray(data) && data.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={70}
                                outerRadius={95}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="cb-empty-state">
                        <div className="cb-empty-circle" />
                        <span className="cb-empty-text">No category data yet</span>
                    </div>
                )}
            </div>

        </div>
    )
}

export default CategoryBreakdown