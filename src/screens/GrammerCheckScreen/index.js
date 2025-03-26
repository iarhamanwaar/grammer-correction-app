import React, { useState, useEffect } from "react";
import { View, TextInput, Text, ScrollView, StyleSheet } from "react-native";
import { useDebounce } from "use-debounce";

export default function GrammarCheckScreen() {
  const [text, setText] = useState("");
  const [corrections, setCorrections] = useState([]);
  const [error, setError] = useState(null);
  const [debouncedText] = useDebounce(text, 1000);

  useEffect(() => {
    if (debouncedText) {
      checkGrammar(debouncedText);
    } else {
      setCorrections([]);
      setError(null);
    }
  }, [debouncedText]);
console.log(process.env.OPENAI_API_KEY,"OPENAI_API_KEY")
  const checkGrammar = async (inputText) => {
    try {
      setError(null);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `You are a grammar correction assistant.
                  Identify and correct grammatical errors in the following text.
                  Return a JSON object in this format:
                  
                  {
                    "corrections": [
                      {
                        "original": "Incorrect phrase",
                        "suggestion": "Corrected phrase",
                        "explanation": "Brief explanation of the correction"
                      }
                    ]
                  }
                  
                  Ensure the response is only JSON with no extra text. 
                  Here is the text to check: "${inputText}"`
            }
          ],
          max_tokens: 500,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      let cleanResponse = data.choices?.[0]?.message?.content?.trim();

      if (!cleanResponse) {
        throw new Error("No response received from the API");
      }

      console.log("Raw response:", cleanResponse);

      if (cleanResponse.startsWith("```json")) {
        cleanResponse = cleanResponse.replace(/```json|```/g, "").trim();
      }

      const parsedData = JSON.parse(cleanResponse);
      
      if (!parsedData.corrections || !Array.isArray(parsedData.corrections)) {
        throw new Error("Invalid response format: missing corrections array");
      }

      setCorrections(parsedData.corrections);
      setError(null);
    } catch (error) {
      console.error("Grammar check error:", error);
      setError(error.message || "An error occurred while checking grammar");
      setCorrections([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.outputSection}>
        <Text style={styles.sectionTitle}>Output</Text>
        <ScrollView style={styles.outputContent}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>Error</Text>
              <Text style={styles.errorMessage}>{error}</Text>
            </View>
          ) : text ? (
            <>
              <View style={styles.textOutputContainer}>
                <Text style={styles.outputText}>
                  {text.split(/\s+/).map((word, index) => (
                    <Text key={index}>
                      <Text
                        style={[
                          styles.wordText,
                          corrections.some(
                            correction => correction.original.toLowerCase().includes(word.toLowerCase())
                          ) && styles.incorrectWord
                        ]}
                      >
                        {word}
                      </Text>
                      {" "}
                    </Text>
                  ))}
                </Text>
              </View>
              
              {corrections.length > 0 && (
                <View style={styles.correctionsContainer}>
                  <Text style={styles.correctionsTitle}>Corrections:</Text>
                  {corrections.map((correction, index) => (
                    <View key={index} style={styles.correctionItem}>
                      <View style={styles.correctionHeader}>
                        <Text style={styles.correctionLabel}>Original: </Text>
                        <Text style={styles.incorrectWord}>{correction.original}</Text>
                      </View>
                      <View style={styles.correctionHeader}>
                        <Text style={styles.correctionLabel}>Suggestion: </Text>
                        <Text style={styles.suggestionText}>{correction.suggestion}</Text>
                      </View>
                      <Text style={styles.explanationText}>{correction.explanation}</Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          ) : (
            <Text style={styles.placeholderText}>
              Output text goes here, with incorrect words highlighted as shown.
            </Text>
          )}
        </ScrollView>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          multiline
          value={text}
          onChangeText={setText}
          placeholder="User's plain text input goes here."
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  outputSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  outputContent: {
    flex: 1,
  },
  textOutputContainer: {
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 16,
  },
  outputText: {
    fontSize: 16,
    lineHeight: 28,
    flexWrap: 'wrap',
    color: '#333',
  },
  wordText: {
    color: '#333',
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
    lineHeight: 24,
  },
  incorrectWord: {
    color: '#ff4444',
    fontWeight: '500',
    backgroundColor: '#ffebee',
    borderRadius: 4,
    overflow: 'hidden',
    padding: 2,
  },
  inputSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    minHeight: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlignVertical: 'top',
  },
  correctionsContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  correctionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  correctionItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  correctionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  correctionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  suggestionText: {
    color: '#2ecc71',
    fontWeight: '500',
    fontSize: 14,
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  errorContainer: {
    backgroundColor: '#fff3f3',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  errorTitle: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  errorMessage: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
});
