import React, { useState } from 'react';
import "./CreateGroup.css";

const CreateGroup = ({ createGroupShow, setCreateGroupShow, name, setName }) => {
    const [isCreated, setIsCreated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    return (
        <>
            {createGroupShow && (
                <div className="overlay">
                    <div className="modal">
                        {!isCreated ? (
                            <>
                                <div className="header">
                                    <h2>Create a Squad</h2>
                                    <p>Ready to start something big?</p>
                                </div>

                                <div className="input-group">
                                    <label>Group Name</label>
                                    <input
                                        autoFocus
                                        value={name}
                                        maxLength={30}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Alpha Coders"
                                    />
                                    <p className="warning">
                                        {name.length > 0 && name.length < 3 && "⚠️ Minimum 3 characters required"}
                                    </p>
                                </div>

                                <div className="buttons">
                                    <button className="cancel-btn" onClick={() => setCreateGroupShow(false)}>
                                        Cancel
                                    </button>

                                    <button
                                        disabled={name.length < 3 || loading}
                                        onClick={() => setIsCreated(true)}
                                        className="create-btn"
                                    >
                                        {loading ? "Creating..." : "Create Now"}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="success">
                                <div className="icon">✅</div>
                                <h2>Squad Created!</h2>
                                <p>Share these details with your teammates.</p>

                                <div className="invite-box">
                                    <span>Invitation Code</span>
                                    <div className="code">generatedCode</div>
                                </div>

                                <div className="share-box">
                                    <div className="share-header">
                                        <span>Quick Share</span>
                                        {copySuccess && <span className="copied">Copied!</span>}
                                    </div>

                                    <div className="share-input">
                                        <p>{window.location.origin}/join/generatedCode</p>
                                        <button onClick={() => console.log("copy")}>Copy</button>
                                    </div>
                                </div>

                                <button
                                    className="done-btn"
                                    onClick={() => { setIsCreated(false); setCreateGroupShow(false) }}
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateGroup;