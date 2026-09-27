"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem("fitlog-plan");
      const s = localStorage.getItem("fitlog-saved");
      if (p) setPlan(JSON.parse(p));
      if (s) setSaved(JSON.parse(s));
    } catch (e) {
      console.log("load fail", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [plan, saved, isLoaded]);

  const addToPlan = (w) => {
    if (plan.find((x) => x.id === w.id)) return toast.info("already in plan");
    if (plan.length >= 5) return toast.error("plan full max 5");
    setPlan([...plan, w]);
    toast.success("added to plan");
  };
  const removeFromPlan = (id) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.success("removed");
  };
  const addToSaved = (w) => {
    if (saved.find((x) => x.id === w.id)) return toast.info("already saved");
    setSaved([...saved, w]);
    toast.success("saved");
  };
  const removeFromSaved = (id) => {
    setSaved(saved.filter((w) => w.id !== id));
    toast.success("removed");
  };
  const markDone = (id) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.success("marked as done");
  };

  const inPlan = (id) => plan.some((w) => w.id === id);
  const inSaved = (id) => saved.some((w) => w.id === id);

  return (
    <PlanContext.Provider value={{ plan, saved, isLoaded, addToPlan, removeFromPlan, addToSaved, removeFromSaved, markDone, inPlan, inSaved, saveForLater: addToSaved }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const c = useContext(PlanContext);
  if (!c) throw new Error("usePlan inside provider");
  return c;
}