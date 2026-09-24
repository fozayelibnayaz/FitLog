"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// one context to rule the plan, saved list lives here too
const PlanContext = createContext(null);

const MAX_PLAN = 5; // cap of five, dont be greedy

// read localStorage safely, server render wont crash this way
function readStore(key) {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]); // ids in today's plan
  const [saved, setSaved] = useState([]); // ids saved for later
  const [hydrated, setHydrated] = useState(false);

  // pull from localStorage once we're actually in the browser
  useEffect(() => {
    setPlan(readStore("fitlog-plan"));
    setSaved(readStore("fitlog-saved"));
    setHydrated(true);
  }, []);

  // push back every time they change, but only after hydrate
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, hydrated]);

  function addToPlan(workout) {
    if (plan.includes(workout.id)) {
      toast.warn("already in today's plan.");
      return;
    }
    if (plan.length >= MAX_PLAN) {
      toast.warn("today's plan is full (5 lifts). finish some first.");
      return;
    }
    setPlan([...plan, workout.id]);
    toast.success(`${workout.name} added to today's plan.`);
  }

  function saveForLater(workout) {
    if (saved.includes(workout.id)) {
      toast.warn("already saved for later.");
      return;
    }
    setSaved([...saved, workout.id]);
    toast.success(`${workout.name} saved for later.`);
  }

  function removeFromPlan(id) {
    setPlan(plan.filter((pid) => pid !== id));
    toast.info("removed from today's plan.");
  }

  function removeFromSaved(id) {
    setSaved(saved.filter((sid) => sid !== id));
    toast.info("removed from saved.");
  }

  function markDone(id) {
    setPlan(plan.filter((pid) => pid !== id));
    toast.success("nice. logged as done.");
  }

  const value = {
    plan,
    saved,
    addToPlan,
    saveForLater,
    removeFromPlan,
    removeFromSaved,
    markDone,
    inPlan: (id) => plan.includes(id),
    inSaved: (id) => saved.includes(id),
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

// tiny hook so components just say: const { plan } = usePlan()
export function usePlan() {
  return useContext(PlanContext);
}